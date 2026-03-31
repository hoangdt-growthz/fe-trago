"use client";

import type { ChangeEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { EditorContent, ReactRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Mention from "@tiptap/extension-mention";
import {
  AtSign,
  Bold,
  Hash,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  MapPin,
  Smile,
  Underline as UnderlineIcon,
  Video,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SuggestionItem = { id: string; label: string };

const mockUsers: SuggestionItem[] = [
  { id: "1", label: "Admin" },
  { id: "2", label: "Cafe Botanical" },
  { id: "3", label: "Harbor Bistro" },
  { id: "4", label: "Mountain Lodge" },
  { id: "5", label: "Sky Lounge Bar" },
  { id: "6", label: "Ocean Breeze Resort" }
];

const mockHashtags: SuggestionItem[] = [
  { id: "1", label: "promotion" },
  { id: "2", label: "event" },
  { id: "3", label: "newmenu" },
  { id: "4", label: "opening" },
  { id: "5", label: "holiday" },
  { id: "6", label: "announcement" },
  { id: "7", label: "livemusic" }
];

interface SuggestionListProps {
  items: SuggestionItem[];
  command: (item: SuggestionItem) => void;
}

const SuggestionList = forwardRef<{ onKeyDown: (props: { event: KeyboardEvent }) => boolean }, SuggestionListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (!items.length) return false;
        if (event.key === "ArrowUp") {
          setSelectedIndex((current) => (current + items.length - 1) % items.length);
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((current) => (current + 1) % items.length);
          return true;
        }
        if (event.key === "Enter") {
          command(items[selectedIndex]);
          return true;
        }
        return false;
      }
    }));

    if (!items.length) return null;

    return (
      <div className="z-50 min-w-[180px] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              index === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
            )}
            onClick={() => command(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
);

SuggestionList.displayName = "SuggestionList";

function createSuggestion(items: SuggestionItem[], char = "@") {
  return {
    char,
    items: ({ query }: { query: string }) =>
      items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    render: () => {
      let component: ReactRenderer<{ onKeyDown: (props: { event: KeyboardEvent }) => boolean }> | null = null;
      let popup: HTMLDivElement | null = null;

      return {
        onStart: (props: any) => {
          component = new ReactRenderer(SuggestionList, {
            props,
            editor: props.editor
          });

          popup = document.createElement("div");
          popup.style.position = "absolute";
          popup.style.zIndex = "60";
          document.body.appendChild(popup);

          const rect = props.clientRect?.();
          if (rect && popup) {
            popup.style.top = `${rect.bottom + window.scrollY + 4}px`;
            popup.style.left = `${rect.left + window.scrollX}px`;
          }

          if (popup && component.element) {
            popup.appendChild(component.element);
          }
        },
        onUpdate: (props: any) => {
          component?.updateProps(props);
          const rect = props.clientRect?.();
          if (rect && popup) {
            popup.style.top = `${rect.bottom + window.scrollY + 4}px`;
            popup.style.left = `${rect.left + window.scrollX}px`;
          }
        },
        onKeyDown: (props: any) => {
          if (props.event.key === "Escape") {
            popup?.remove();
            component?.destroy();
            return true;
          }
          return component?.ref?.onKeyDown(props) ?? false;
        },
        onExit: () => {
          popup?.remove();
          component?.destroy();
        }
      };
    }
  };
}

function ToolButton({
  active,
  title,
  onClick,
  children,
  colorClassName
}: {
  active?: boolean;
  title: string;
  onClick: () => void;
  children: ReactNode;
  colorClassName?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        colorClassName
      )}
    >
      {children}
    </button>
  );
}

function InlinePanel({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="border-t border-border bg-muted/30 p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
        <button type="button" onClick={onClose} className="text-muted-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

export default function RichTextEditor({
  content = "",
  placeholder = "What's new?",
  onChange,
  className
}: {
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  className?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [imagePanelOpen, setImagePanelOpen] = useState(false);
  const [videoPanelOpen, setVideoPanelOpen] = useState(false);
  const [linkPanelOpen, setLinkPanelOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closePanels = useCallback(() => {
    setEmojiPickerOpen(false);
    setImagePanelOpen(false);
    setVideoPanelOpen(false);
    setLinkPanelOpen(false);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] }
      }),
      Underline,
      Placeholder.configure({ placeholder }),
      Image.configure({
        HTMLAttributes: { class: "my-2 h-auto max-w-full rounded-lg" }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "cursor-pointer text-primary underline" }
      }),
      Youtube.configure({
        inline: false,
        width: 640,
        height: 360,
        HTMLAttributes: { class: "my-2 aspect-video w-full rounded-lg" }
      }),
      Mention.extend({ name: "mention" }).configure({
        HTMLAttributes: {
          class: "rounded bg-primary/10 px-1 py-0.5 font-medium text-primary"
        },
        suggestion: createSuggestion(mockUsers, "@"),
        renderText: ({ node }) => `@${node.attrs.label}`
      }),
      Mention.extend({ name: "hashtag" }).configure({
        HTMLAttributes: {
          class: "rounded bg-sky-500/10 px-1 py-0.5 font-medium text-sky-600"
        },
        suggestion: createSuggestion(mockHashtags, "#"),
        renderText: ({ node }) => `#${node.attrs.label}`
      })
    ],
    content,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] px-4 py-3 text-[15px] leading-relaxed text-foreground focus:outline-none [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:h-0 [&_p.is-editor-empty:first-child::before]:text-muted-foreground/60 [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_strong]:font-semibold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-lg"
      }
    }
  });

  const addImageByUrl = useCallback(() => {
    if (!imageUrl || !editor) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl("");
    setImagePanelOpen(false);
  }, [editor, imageUrl]);

  const addVideoByUrl = useCallback(() => {
    if (!videoUrl || !editor) return;
    editor.chain().focus().setYoutubeVideo({ src: videoUrl }).run();
    setVideoUrl("");
    setVideoPanelOpen(false);
  }, [editor, videoUrl]);

  const addLinkByUrl = useCallback(() => {
    if (!linkUrl || !editor) return;
    editor.chain().focus().setLink({ href: linkUrl }).run();
    setLinkUrl("");
    setLinkPanelOpen(false);
  }, [editor, linkUrl]);

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;
      const url = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: url }).run();
      event.target.value = "";
      setImagePanelOpen(false);
    },
    [editor]
  );

  const handleUrlKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>, submit: () => void) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  if (!editor) return null;

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-all duration-200",
        isFocused ? "border-primary/40 shadow-sm ring-1 ring-primary/10" : "border-border",
        className
      )}
    >
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

      <div onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
        <EditorContent editor={editor} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-3 py-2">
        <div className="flex flex-wrap items-center gap-0.5">
          <ToolButton
            title="Add image"
            onClick={() => {
              setImagePanelOpen((current) => !current);
              setVideoPanelOpen(false);
              setLinkPanelOpen(false);
              setEmojiPickerOpen(false);
            }}
            colorClassName="text-emerald-600"
          >
            <ImageIcon className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton
            title="Tag location"
            onClick={() => editor.chain().focus().insertContent("📍 ").run()}
            colorClassName="text-red-500"
          >
            <MapPin className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton
            title="Add emoji"
            onClick={() => {
              setEmojiPickerOpen((current) => !current);
              setImagePanelOpen(false);
              setVideoPanelOpen(false);
              setLinkPanelOpen(false);
            }}
            colorClassName="text-amber-500"
          >
            <Smile className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton
            title="Add link"
            onClick={() => {
              setLinkPanelOpen((current) => !current);
              setImagePanelOpen(false);
              setVideoPanelOpen(false);
              setEmojiPickerOpen(false);
            }}
            colorClassName="text-blue-500"
          >
            <LinkIcon className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton
            title="Add video"
            onClick={() => {
              setVideoPanelOpen((current) => !current);
              setImagePanelOpen(false);
              setLinkPanelOpen(false);
              setEmojiPickerOpen(false);
            }}
            colorClassName="text-violet-500"
          >
            <Video className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton title="Mention" onClick={() => editor.chain().focus().insertContent("@").run()} colorClassName="text-primary">
            <AtSign className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton title="Hashtag" onClick={() => editor.chain().focus().insertContent("#").run()} colorClassName="text-sky-500">
            <Hash className="h-[18px] w-[18px]" />
          </ToolButton>

          <div className="mx-1 h-5 w-px bg-border" />

          <ToolButton active={editor.isActive("bold")} title="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="h-4 w-4" />
          </ToolButton>
          <ToolButton active={editor.isActive("italic")} title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive("underline")}
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive("bulletList")}
            title="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive("orderedList")}
            title="Ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolButton>
        </div>

        {!editor.isEmpty ? <span className="text-xs tabular-nums text-muted-foreground/50">{editor.getText().length}</span> : null}
      </div>

      <InlinePanel open={imagePanelOpen} title="Insert Image" onClose={() => setImagePanelOpen(false)}>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} onKeyDown={(event) => handleUrlKeyDown(event, addImageByUrl)} placeholder="https://example.com/image.jpg" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={addImageByUrl}>
              Insert
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()}>
              Upload
            </Button>
          </div>
        </div>
      </InlinePanel>

      <InlinePanel open={videoPanelOpen} title="Insert Video" onClose={() => setVideoPanelOpen(false)}>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>YouTube URL</Label>
            <Input value={videoUrl} onChange={(event) => setVideoUrl(event.target.value)} onKeyDown={(event) => handleUrlKeyDown(event, addVideoByUrl)} placeholder="https://www.youtube.com/watch?v=..." />
          </div>
          <Button size="sm" onClick={addVideoByUrl}>
            Insert Video
          </Button>
        </div>
      </InlinePanel>

      <InlinePanel open={linkPanelOpen} title="Insert Link" onClose={() => setLinkPanelOpen(false)}>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Link URL</Label>
            <Input value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} onKeyDown={(event) => handleUrlKeyDown(event, addLinkByUrl)} placeholder="https://example.com" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={addLinkByUrl}>
              Insert Link
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setLinkPanelOpen(false);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </InlinePanel>

      {emojiPickerOpen ? (
        <div className="border-t border-border p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Emoji Picker</p>
            <button type="button" onClick={() => setEmojiPickerOpen(false)} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native?: string }) => {
              if (emoji.native) {
                editor.chain().focus().insertContent(emoji.native).run();
              }
              setEmojiPickerOpen(false);
            }}
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      ) : null}
    </div>
  );
}
