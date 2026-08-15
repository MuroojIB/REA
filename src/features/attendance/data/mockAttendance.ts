export interface AttendanceRecord {
    id: string;
    monthKey: string;
    monthDisplay: string; 
    date: string;
    checkInTime: string;
    checkOutTime: string;
    status: 'Present' | 'Late' | 'Absent' | 'Excused';
}

export const ATTENDANCE_MONTHS = ['May', 'June', 'July', 'August'];

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
    { id: 'june-1', monthKey: 'June', monthDisplay: 'June 2025', date: 'Sat, 10 Jun', checkInTime: '08:00 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'june-2', monthKey: 'June', monthDisplay: 'June 2025', date: 'Sun, 11 Jun', checkInTime: '09:10 AM', checkOutTime: '05:00 PM', status: 'Late' },
    { id: 'june-3', monthKey: 'June', monthDisplay: 'June 2025', date: 'Mon, 12 Jun', checkInTime: '-', checkOutTime: '-', status: 'Absent' },
    { id: 'june-4', monthKey: 'June', monthDisplay: 'June 2025', date: 'Tue, 13 Jun', checkInTime: '-', checkOutTime: '-', status: 'Excused' },
    { id: 'june-5', monthKey: 'June', monthDisplay: 'June 2025', date: 'Wed, 14 Jun', checkInTime: '07:55 AM', checkOutTime: '04:55 PM', status: 'Present' },
    { id: 'june-6', monthKey: 'June', monthDisplay: 'June 2025', date: 'Thu, 15 Jun', checkInTime: '08:05 AM', checkOutTime: '05:00 PM', status: 'Present' },

    { id: 'july-1', monthKey: 'July', monthDisplay: 'July 2025', date: 'Mon, 10 Jul', checkInTime: '08:01 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'july-2', monthKey: 'July', monthDisplay: 'July 2025', date: 'Tue, 11 Jul', checkInTime: '09:00 AM', checkOutTime: '05:15 PM', status: 'Late' },
    { id: 'july-3', monthKey: 'July', monthDisplay: 'July 2025', date: 'Wed, 12 Jul', checkInTime: '07:50 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'july-4', monthKey: 'July', monthDisplay: 'July 2025', date: 'Thu, 13 Jul', checkInTime: '-', checkOutTime: '-', status: 'Absent' },
    { id: 'july-5', monthKey: 'July', monthDisplay: 'July 2025', date: 'Fri, 14 Jul', checkInTime: '-', checkOutTime: '-', status: 'Excused' },
    { id: 'july-6', monthKey: 'July', monthDisplay: 'July 2025', date: 'Sat, 15 Jul', checkInTime: '08:00 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'july-7', monthKey: 'July', monthDisplay: 'July 2025', date: 'Sun, 16 Jul', checkInTime: '08:15 AM', checkOutTime: '05:00 PM', status: 'Late' },
    { id: 'july-8', monthKey: 'July', monthDisplay: 'July 2025', date: 'Mon, 17 Jul', checkInTime: '-', checkOutTime: '-', status: 'Absent' },
    { id: 'july-9', monthKey: 'July', monthDisplay: 'July 2025', date: 'Tue, 18 Jul', checkInTime: '07:58 AM', checkOutTime: '05:02 PM', status: 'Present' },
    { id: 'july-10', monthKey: 'July', monthDisplay: 'July 2025', date: 'Wed, 19 Jul', checkInTime: '08:00 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'july-11', monthKey: 'July', monthDisplay: 'July 2025', date: 'Thu, 20 Jul', checkInTime: '-', checkOutTime: '-', status: 'Excused' },

    { id: 'aug-1', monthKey: 'August', monthDisplay: 'August 2025', date: 'Thu, 10 Aug', checkInTime: '08:02 AM', checkOutTime: '05:11 PM', status: 'Present' },
    { id: 'aug-2', monthKey: 'August', monthDisplay: 'August 2025', date: 'Fri, 11 Aug', checkInTime: '09:15 AM', checkOutTime: '05:30 PM', status: 'Late' },
    { id: 'aug-3', monthKey: 'August', monthDisplay: 'August 2025', date: 'Sat, 12 Aug', checkInTime: '07:55 AM', checkOutTime: '05:05 PM', status: 'Present' },
    { id: 'aug-4', monthKey: 'August', monthDisplay: 'August 2025', date: 'Sun, 13 Aug', checkInTime: '-', checkOutTime: '-', status: 'Absent' },
    { id: 'aug-5', monthKey: 'August', monthDisplay: 'August 2025', date: 'Mon, 14 Aug', checkInTime: '-', checkOutTime: '-', status: 'Excused' },
    { id: 'aug-6', monthKey: 'August', monthDisplay: 'August 2025', date: 'Tue, 15 Aug', checkInTime: '08:00 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'aug-7', monthKey: 'August', monthDisplay: 'August 2025', date: 'Wed, 16 Aug', checkInTime: '08:30 AM', checkOutTime: '05:00 PM', status: 'Late' },
    { id: 'aug-8', monthKey: 'August', monthDisplay: 'August 2025', date: 'Thu, 17 Aug', checkInTime: '-', checkOutTime: '-', status: 'Absent' },
    { id: 'aug-9', monthKey: 'August', monthDisplay: 'August 2025', date: 'Fri, 18 Aug', checkInTime: '07:50 AM', checkOutTime: '05:00 PM', status: 'Present' },
    { id: 'aug-10', monthKey: 'August', monthDisplay: 'August 2025', date: 'Sat, 19 Aug', checkInTime: '-', checkOutTime: '-', status: 'Excused' },
    { id: 'aug-11', monthKey: 'August', monthDisplay: 'August 2025', date: 'Sun, 20 Aug', checkInTime: '08:00 AM', checkOutTime: '05:00 PM', status: 'Present' },
];