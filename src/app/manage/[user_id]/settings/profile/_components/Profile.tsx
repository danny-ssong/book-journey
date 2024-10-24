import Button from "@/app/_components/Button";
import React from "react";

function Profile({ profile }: { profile: any }) {
  const handleSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex flex-col border w-[600px] h-[800px]">
        <div className="flex items-center">
          <div className=" rounded-full w-24 h-24 overflow-hidden">
            <img className="object-contain" src={"https://picsum.photos/200/300"} alt="user img" />
          </div>
          <div className="flex flex-1 justify-center">
            <label className="text-xl mr-4">닉네임</label>
            <input className="text-xl" value={"별명"} />
          </div>
        </div>
        <textarea className="px-2 py-10 w-full flex-1 resize-none">
          소개글 sfssss소개글 sfssss소개글 sfssss소개글 sfssss소개글 sfssss소개글 sfssss 소개글 sfssss소개글 sfssss
        </textarea>
      </form>
      <div className="flex justify-end">
        <Button>저장</Button>
      </div>
    </div>
  );
}

export default Profile;
