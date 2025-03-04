import { unstable_cache } from "next/cache";

type CacheOptions = {
  tags?: string[];
  revalidate?: number;
};

export const cacheWithLogging = async <T>(
  fn: () => Promise<T>,
  cacheKey: string[],
  functionName: string,
  options?: CacheOptions,
) => {
  let isCacheHit = true;

  // 원본 함수를 로깅 래퍼로 감싸기
  const wrappedFn = async () => {
    isCacheHit = false;
    console.log(`[Cache MISS] Key: ${cacheKey.join(":")}`);

    const startTime = Date.now();
    const result = await fn();
    const executionTime = Date.now() - startTime;

    console.log(`[DB Query] Execution time: ${executionTime}ms`);
    return result;
  };

  try {
    const startTime = Date.now();
    const result = await unstable_cache(wrappedFn, cacheKey, options)();
    const totalTime = Date.now() - startTime;

    console.log(
      `[Cache ${isCacheHit ? "HIT" : "MISS"}] Total time: ${totalTime}ms  ${functionName}`,
    );
    return result;
  } catch (error) {
    console.error(
      `[Cache Error] Key: ${cacheKey.join(":")}: ${functionName}`,
      error,
    );
    throw error;
  }
};
