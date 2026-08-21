export const monks = [
  { id: 'TM-1001', name: 'Tenzin Dorje', classId: 'L1', status: 'enrolled', guardian: 'Tenzin Wangyal', joined: '2019-04-12', attendanceRate: 96, feeBalance: 0, sponsor: 'Chenrezig Foundation' },
  { id: 'TM-1002', name: 'Ngawang Lhamo', classId: 'L2', status: 'enrolled', guardian: 'Tsering Norbu', joined: '2020-06-03', attendanceRate: 91, feeBalance: 120, sponsor: 'Kailash Trust' },
  { id: 'TM-1003', name: 'Kelsang Namdol', classId: 'L3', status: 'enrolled', guardian: 'Phuntsok Wangmo', joined: '2018-09-21', attendanceRate: 89, feeBalance: 0, sponsor: '' },
  { id: 'TM-1004', name: 'Sonam Gyatso', classId: 'L4', status: 'enrolled', guardian: 'Gyatso Sangpo', joined: '2017-03-15', attendanceRate: 84, feeBalance: 300, sponsor: 'Mandala Foundation' },
  { id: 'TM-1005', name: 'Lobsang Tashi', classId: 'L2', status: 'pending', guardian: 'Tashi Tsering', joined: '2023-08-30', attendanceRate: 0, feeBalance: 180, sponsor: '' },
  { id: 'TM-1006', name: 'Pema Dolma', classId: 'L5', status: 'enrolled', guardian: 'Dolma Yangzom', joined: '2016-11-02', attendanceRate: 93, feeBalance: 0, sponsor: 'Chenrezig Foundation' },
  { id: 'TM-1007', name: 'Dorje Tsering', classId: 'L6', status: 'graduated', guardian: 'Tsering Dolkar', joined: '2012-05-19', attendanceRate: 98, feeBalance: 0, sponsor: 'Kailash Trust' },
  { id: 'TM-1008', name: 'Tashi Wangchuk', classId: 'L3', status: 'enrolled', guardian: 'Wangchuk Dorje', joined: '2019-01-27', attendanceRate: 87, feeBalance: 60, sponsor: '' },
  { id: 'TM-1009', name: 'Sangye Tenzin', classId: 'L7', status: 'enrolled', guardian: 'Tenzin Choedon', joined: '2014-07-08', attendanceRate: 95, feeBalance: 0, sponsor: 'Manjushree Trust' },
  { id: 'TM-1010', name: 'Kunzang Choden', classId: 'L4', status: 'withdrawn', guardian: 'Choden Lhamo', joined: '2015-02-14', attendanceRate: 72, feeBalance: 240, sponsor: '' },
  { id: 'TM-1011', name: 'Gyatso Pelzang', classId: 'L1', status: 'enrolled', guardian: 'Pelzang Ngodup', joined: '2022-10-05', attendanceRate: 90, feeBalance: 0, sponsor: 'Mandala Foundation' },
  { id: 'TM-1012', name: 'Dechen Zangmo', classId: 'L5', status: 'enrolled', guardian: 'Zangmo Wangmo', joined: '2018-12-11', attendanceRate: 88, feeBalance: 90, sponsor: '' },
]

export const classes = [
  { id: 'L1', name: 'Level 1', students: 18, teacher: 'Khenpo Rinchen', room: 'Room 101', color: '#8C1F28' },
  { id: 'L2', name: 'Level 2', students: 21, teacher: 'Lama Pema Wangyal', room: 'Room 102', color: '#D98E32' },
  { id: 'L3', name: 'Level 3', students: 15, teacher: 'Khenpo Sonam Gyaltsen', room: 'Room 103', color: '#2E7D32' },
  { id: 'L4', name: 'Level 4', students: 17, teacher: 'Geshe Lobsang Palden', room: 'Room 104', color: '#1565C0' },
  { id: 'L5', name: 'Level 5', students: 12, teacher: 'Geshe Ngawang Chophel', room: 'Room 105', color: '#7B1FA2' },
  { id: 'L6', name: 'Level 6', students: 10, teacher: 'Lama Kalsang Yonten', room: 'Room 106', color: '#EF6C00' },
  { id: 'L7', name: 'Level 7', students: 9, teacher: 'Geshe Tsultrim Gyatso', room: 'Room 107', color: '#00838F' },
  { id: 'A1', name: 'Advanced Debate', students: 8, teacher: 'Khenpo Jampa Lhawang', room: 'Debate Hall', color: '#5D4037' },
  { id: 'B1', name: 'Grammar Class', students: 14, teacher: 'Lama Dorje Tashi', room: 'Room 201', color: '#AD1457' },
  { id: 'C1', name: 'English Proficiency', students: 16, teacher: 'Ms. Rina Shakya', room: 'Room 202', color: '#6A1B9A' },
  { id: 'D1', name: 'Science & Environment', students: 13, teacher: 'Mr. Deepak Lama', room: 'Lab 1', color: '#1B5E20' },
  { id: 'E1', name: 'Computer Basics', students: 15, teacher: 'Mr. Niraj Shrestha', room: 'Computer Lab', color: '#E65100' },
]

export const schedule = [
  { dayKey: 'monday', time: '08:00 - 09:30', subjectKey: 'alphabet', className: 'Level 1', teacher: 'Lama Pema Wangyal', room: 'Room 101' },
  { dayKey: 'monday', time: '10:00 - 11:30', subjectKey: 'english', className: 'English Proficiency', teacher: 'Ms. Rina Shakya', room: 'Room 202' },
  { dayKey: 'monday', time: '14:00 - 15:30', subjectKey: 'debate', className: 'Advanced Debate', teacher: 'Khenpo Jampa Lhawang', room: 'Debate Hall' },
  { dayKey: 'tuesday', time: '08:00 - 09:30', subjectKey: 'grammar', className: 'Grammar Class', teacher: 'Lama Dorje Tashi', room: 'Room 201' },
  { dayKey: 'tuesday', time: '10:00 - 11:30', subjectKey: 'maths', className: 'Science & Environment', teacher: 'Mr. Deepak Lama', room: 'Lab 1' },
  { dayKey: 'tuesday', time: '14:00 - 15:30', subjectKey: 'logic', className: 'Level 4', teacher: 'Geshe Lobsang Palden', room: 'Room 104' },
  { dayKey: 'wednesday', time: '08:00 - 09:30', subjectKey: 'madhyamaka', className: 'Level 5', teacher: 'Geshe Ngawang Chophel', room: 'Room 105' },
  { dayKey: 'wednesday', time: '10:00 - 11:30', subjectKey: 'science', className: 'Science & Environment', teacher: 'Mr. Deepak Lama', room: 'Lab 1' },
  { dayKey: 'thursday', time: '08:00 - 09:30', subjectKey: 'history', className: 'Level 3', teacher: 'Khenpo Sonam Gyaltsen', room: 'Room 103' },
  { dayKey: 'thursday', time: '10:00 - 11:30', subjectKey: 'typing', className: 'Computer Basics', teacher: 'Mr. Niraj Shrestha', room: 'Computer Lab' },
  { dayKey: 'friday', time: '08:00 - 09:30', subjectKey: 'vinaya', className: 'Level 7', teacher: 'Geshe Tsultrim Gyatso', room: 'Room 107' },
  { dayKey: 'friday', time: '10:00 - 11:30', subjectKey: 'thangka', className: 'Level 2', teacher: 'Lama Kalsang Yonten', room: 'Room 106' },
  { dayKey: 'friday', time: '14:00 - 15:30', subjectKey: 'music', className: 'Level 6', teacher: 'Lama Kalsang Yonten', room: 'Room 106' },
  { dayKey: 'saturday', time: '09:00 - 11:00', subjectKey: 'abhidharma', className: 'Level 6', teacher: 'Geshe Tsultrim Gyatso', room: 'Room 107' },
]

export const philosophy = [
  { id: 'p1', titleKey: 'madhyamaka', level: 'Level 5', progress: 62, teacher: 'Geshe Ngawang Chophel', students: 12, modules: 8 },
  { id: 'p2', titleKey: 'logic', level: 'Level 4', progress: 78, teacher: 'Geshe Lobsang Palden', students: 17, modules: 10 },
  { id: 'p3', titleKey: 'abhidharma', level: 'Level 6', progress: 41, teacher: 'Geshe Tsultrim Gyatso', students: 10, modules: 12 },
  { id: 'p4', titleKey: 'vinaya', level: 'Level 7', progress: 33, teacher: 'Geshe Tsultrim Gyatso', students: 9, modules: 9 },
  { id: 'p5', titleKey: 'debate', level: 'Level 3', progress: 88, teacher: 'Khenpo Jampa Lhawang', students: 15, modules: 6 },
]

export const syllabi = [
  { id: 's1', titleKey: 'english', code: 'ENG-101', semester: 'Fall', credits: 3, modules: ['Reading', 'Writing', 'Listening', 'Speaking'], descriptionKey: 'syl1', color: '#1565C0' },
  { id: 's2', titleKey: 'maths', code: 'MTH-102', semester: 'Fall', credits: 4, modules: ['Arithmetic', 'Algebra', 'Geometry', 'Statistics'], descriptionKey: 'syl2', color: '#2E7D32' },
  { id: 's3', titleKey: 'thangka', code: 'ART-201', semester: 'Spring', credits: 3, modules: ['Line Work', 'Iconography', 'Color Mixing', 'Studio'], descriptionKey: 'syl3', color: '#EF6C00' },
  { id: 's4', titleKey: 'history', code: 'HIS-103', semester: 'Fall', credits: 3, modules: ['Ancient India', 'Tibetan Lineage', 'Himalayan Tradition', 'Modern Era'], descriptionKey: 'syl4', color: '#7B1FA2' },
]

export const activities = [
  { key: 'act1', time: '2h ago' },
  { key: 'act2', time: '5h ago' },
  { key: 'act3', time: '1d ago' },
  { key: 'act4', time: '2d ago' },
  { key: 'act5', time: '3d ago' },
]

export const events = [
  { key: 'ev1', date: 'Aug 12', tagKey: 'tagReligious' },
  { key: 'ev2', date: 'Aug 20', tagKey: 'tagAcademic' },
  { key: 'ev3', date: 'Aug 27', tagKey: 'tagMeeting' },
  { key: 'ev4', date: 'Sep 05', tagKey: 'tagCultural' },
]

export const transactions = [
  { id: 'T-101', type: 'fee', name: 'Ngawang Lhamo', monk: 'Ngawang Lhamo', amount: 180, date: '2026-08-01', note: 'Monthly fee installment' },
  { id: 'T-102', type: 'sponsorship', name: 'Chenrezig Foundation', monk: '', amount: 1200, date: '2026-07-28', note: 'Annual sponsorship grant' },
  { id: 'T-103', type: 'donation', name: 'Anonymous Devotee', monk: '', amount: 350, date: '2026-07-25', note: 'Festival offering' },
  { id: 'T-104', type: 'fee', name: 'Tenzin Dorje', monk: 'Tenzin Dorje', amount: 180, date: '2026-07-30', note: 'Monthly fee settled' },
  { id: 'T-105', type: 'donation', name: 'Kailash Trust', monk: '', amount: 800, date: '2026-07-20', note: 'Food program support' },
]

export const donations = transactions.filter((t) => t.type !== 'fee')

export const adminProfiles = [
  { id: 'A1', name: 'Lama Tsering Norbu', roleKey: 'profileRole', permissions: ['Full access'], lastActive: 'Just now', color: '#8C1F28' },
  { id: 'A2', name: 'Khenpo Jampa Lhawang', roleKey: 'roleTeacher', permissions: ['Classes', 'Attendance'], lastActive: '12m ago', color: '#1565C0' },
  { id: 'A3', name: 'Mr. Niraj Shrestha', roleKey: 'roleAccountant', permissions: ['Fees', 'Reports'], lastActive: '1h ago', color: '#2E7D32' },
]
