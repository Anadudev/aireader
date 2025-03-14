"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTapRichText = ({ description }: { description: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write something …",
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
        showOnlyWhenEditable: false,
      }),
    ],

    content: description,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    // content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "border rounded-md  p-2 mx-auto min-h-12",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default TipTapRichText;
