import Image from "next/image";

export default function ProfileViewer() {
  return (
    <div className="border">
      <div className="flex items-center">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          {/* <Image
            className="object-contain"
            src="https://picsum.photos/200/300"
            alt="user img"
            width={96}
            height={96}
          /> */}
        </div>
        <div className="flex flex-1 justify-center">
          <p className="">별명</p>
        </div>
      </div>
      <p className="px-2 py-10">
        소개글 sfssss소개글 sfssss소개글 sfssss소개글 sfssss소개글 sfssss소개글
        sfssss 소개글 sfssss소개글 sfssss
      </p>
    </div>
  );
}
