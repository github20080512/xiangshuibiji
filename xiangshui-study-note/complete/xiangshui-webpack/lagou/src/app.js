import router from './routes'
let hash = location.hash.slice(1)
router.go(hash)