"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import CodeBlock from '@tiptap/extension-code-block'
// import TextAlign from '@tiptap/extension-text-align'

export type TipTapRichTextProps = {
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
};

const lowlight = createLowlight(all);

const TipTapRichText: React.FC<TipTapRichTextProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      const richValue = editor.getHTML();
      setValue(richValue);
    },
    immediatelyRender: false,
    extensions: [
      StarterKit,
      CodeBlock,
      Placeholder.configure({
        placeholder,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      // TextAlign.configure({
      //   types: ['heading', 'paragraph'],
      // }),
    ],

    content: value,
    editorProps: {
      attributes: {
        class: "border rounded-md  p-2 mx-auto h-full max-h-xl w-full break-words",
      },
    },
  });

  return (
    <div className="">
      <EditorContent editor={editor} />
      <input type="hidden" value={value} />
    </div>
  );
};

export default TipTapRichText;
