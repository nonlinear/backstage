import { getEpicCounts, getTotalEpicCount } from './lib/epics'

const backstageCounts = getEpicCounts('backstage')
console.log('Backstage epic counts:', backstageCounts)
console.log('Total:', getTotalEpicCount('backstage'))
