import React from "react";
import { TriangleAlert } from "lucide-react";
import toast, { Toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const PostDeleteToast = ({ t, onCLick }: { t: Toast; onCLick: () => void }) => {
  return (
    <div
      className={` max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-zinc-500 p-2 items-center`}
    >
      <div className="flex items-start"></div>
      <div className="ml-3 flex-1">
        <p className="text-sm flex space-x-2 items-center font-medium text-gray-900">
          <TriangleAlert />
          <span>Confirm Action</span>
          {/* Confirm Action */}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Are you sure you want to delete this post?
        </p>
        <p className="mt-1 text-sm text-gray-500">
          The action cannot be undone!
        </p>
      </div>
      <div className="space-y-2 grid ">
        <Button
          variant="outline"
          onClick={() => toast.dismiss(t.id)}
          className=""
        >
          Close
        </Button>
        <Button
          size={"sm"}
          variant="destructive"
          onClick={onCLick}
          className=""
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostDeleteToast;
