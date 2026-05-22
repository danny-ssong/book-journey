import { seedLocal } from './seed-local'

seedLocal()
  .then(() => {
    console.log('로컬 Supabase 시드 완료')
  })
  .catch((error) => {
    console.error('시드 실패:', error)
    process.exit(1)
  })
