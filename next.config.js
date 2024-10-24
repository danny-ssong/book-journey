module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        port: "", // 필요에 따라 포트를 설정합니다.
        pathname: "/**", // 모든 경로를 허용
      },
    ],
  },
};
