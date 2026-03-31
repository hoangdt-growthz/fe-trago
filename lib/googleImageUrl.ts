const GOOGLE_IMAGE_HOST = "lh3.googleusercontent.com";

const GOOGLE_IMAGE_VARIANT_SUFFIXES = ["s0", "s2048", "s1024", "w1600", "w1200"] as const;

const GOOGLE_IMAGE_SUFFIX_PATTERN =
  /=(?:[a-z]\d+(?:-[a-z0-9]+)*(?:-[a-z]+\d*)*|[a-z]\d+(?:-[a-z]+\d*)+|w\d+(?:-h\d+)?(?:-[a-z]+\d*)*|h\d+(?:-w\d+)?(?:-[a-z]+\d*)*)(?=$|\?)/i;

const DEMO_INPUT_URL =
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo8Qj8NapTsoMOGlMKVqOuDu1ITlKgdpQh54dZ7D0IMSHtyIsjvCIMA-en4wYY-cuDRugp4jt5F_-FjuLTbfjmYuPgGlPSmMwCi4ABu1rl2BpaXW0jfZ0oroCdW5CsK3wLQqqKAiHR5ptU=s144-w108-h144-n-k-no";

function normalizeUrl(url: string): string {
  return url.trim();
}

function parseUrl(url: string): URL | null {
  try {
    return new URL(normalizeUrl(url));
  } catch {
    return null;
  }
}

export function isGoogleHostedImage(url: string): boolean {
  const parsedUrl = parseUrl(url);
  return parsedUrl?.hostname === GOOGLE_IMAGE_HOST;
}

export function stripGoogleImageParams(url: string): string {
  const trimmedUrl = normalizeUrl(url);
  if (!isGoogleHostedImage(trimmedUrl)) {
    return trimmedUrl;
  }

  const [withoutHash, hash = ""] = trimmedUrl.split("#", 2);
  const [withoutQuery, query = ""] = withoutHash.split("?", 2);
  const strippedPath = withoutQuery.replace(GOOGLE_IMAGE_SUFFIX_PATTERN, "");

  const rebuiltQuery = query ? `?${query}` : "";
  const rebuiltHash = hash ? `#${hash}` : "";

  return `${strippedPath}${rebuiltQuery}${rebuiltHash}`;
}

function appendGoogleImageVariant(baseUrl: string, variant: string): string {
  const [withoutHash, hash = ""] = baseUrl.split("#", 2);
  const [withoutQuery, query = ""] = withoutHash.split("?", 2);
  const rebuiltQuery = query ? `?${query}` : "";
  const rebuiltHash = hash ? `#${hash}` : "";

  return `${withoutQuery}=${variant}${rebuiltQuery}${rebuiltHash}`;
}

export function generateGoogleImageVariants(url: string): string[] {
  const normalizedUrl = normalizeUrl(url);
  if (!isGoogleHostedImage(normalizedUrl)) {
    return [];
  }

  const baseUrl = stripGoogleImageParams(normalizedUrl);
  const variants = GOOGLE_IMAGE_VARIANT_SUFFIXES.map((suffix) => appendGoogleImageVariant(baseUrl, suffix));

  return [...new Set(variants)];
}

async function isUsableImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store"
    });

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

    if (response.body) {
      void response.body.cancel().catch(() => undefined);
    }

    return response.ok && contentType.startsWith("image/");
  } catch {
    return false;
  }
}

export async function getBestCandidate(url: string): Promise<string | null> {
  const candidates = generateGoogleImageVariants(url);
  if (candidates.length === 0) {
    return null;
  }

  for (const candidate of candidates) {
    if (await isUsableImageUrl(candidate)) {
      return candidate;
    }
  }

  return null;
}

export async function demoGoogleImageUrlUpgrade(inputUrl: string = DEMO_INPUT_URL): Promise<void> {
  const candidates = generateGoogleImageVariants(inputUrl);
  console.log("Google image candidates:");
  for (const candidate of candidates) {
    console.log(candidate);
  }

  const bestCandidate = await getBestCandidate(inputUrl);
  console.log("Best candidate:");
  console.log(bestCandidate);
}

