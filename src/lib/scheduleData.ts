import { ScheduleEvent } from './types';

export const schedule: ScheduleEvent[] = [
    { time: '5:00-6:00', days: ['M', 'W', 'F'], title: 'Kickboxing', level: 'Beginner', category: 'Muay Thai Adult', categoryType: 'muay-thai-adult' },
    { time: '6:00-7:15', days: ['M', 'W'], title: 'Adult Gi BJJ', level: 'All Levels', category: 'BJJ Adult', categoryType: 'bjj-adult' },
    { time: '6:00-7:15', days: ['F'], title: 'Adult No-Gi BJJ', level: 'All Levels', category: 'BJJ Adult', categoryType: 'bjj-adult' },
    { time: '9:00-10:00', days: ['S'], title: 'Muay Thai', level: 'All Levels', category: 'Muay Thai Adult', categoryType: 'muay-thai-adult' },
    { time: '10:00-11:00', days: ['S'], title: 'BJJ Fundamentals', level: 'Adults and Children', category: 'BJJ Adult', categoryType: 'bjj-adult' },
    { time: '10:00-11:00', days: ['S'], title: 'Kids Muay Thai', level: 'All Ages, All Levels', category: 'Muay Thai Kids', categoryType: 'muay-thai-kids' },
    { time: '11:00-12:00', days: ['S'], title: 'Fighter Practice', level: 'MMA / Muay Thai', category: 'All-Inclusive', categoryType: 'all-inclusive' },
    { time: '11:00-13:00', days: ['S'], title: 'No-Gi Open Mat', level: 'All Levels', category: 'BJJ Adult', categoryType: 'bjj-adult' },
];