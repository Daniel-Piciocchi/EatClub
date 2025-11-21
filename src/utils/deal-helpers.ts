import { Deal } from '@/types'

export const formatDealTime = (deal: Deal): string => {
    if (deal.open && deal.close) {
        return `${deal.open} - ${deal.close}`
    }

    if (deal.start && deal.end) {
        return `${deal.start} - ${deal.end}`
    }

    return 'Anytime today'
}

export const formatDealTimeWithPrefix = (deal: Deal): string => {
    const time = formatDealTime(deal)

    if (time === 'Anytime today') {
        return time
    }

    return `Between ${time}`
}
