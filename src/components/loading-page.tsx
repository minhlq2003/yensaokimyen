import { Spin } from "antd";

function LoadingPage() {
  return (
    <div className="#a20937 w-full h-full flex flex-col items-center justify-center">
      <div className="text-[#ffeb95]">YẾN SÀO KIM YẾN</div>
      <Spin />
    </div>
  );
}

export default LoadingPage;
