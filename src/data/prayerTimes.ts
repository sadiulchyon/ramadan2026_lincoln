export interface PrayerDay {
  hijriDay: number;
  hijriDate: string;
  gregorianDate: string;
  dayName: string;
  fajrAdhan: string;
  fajrIqamah: string;
  sunrise: string;
  dhuhrAdhan: string;
  dhuhrIqamah: string;
  asrAdhan: string;
  asrIqamah: string;
  maghribAdhan: string;
  maghribIqamah: string;
  ishaAdhan: string;
  ishaIqamah: string;
  tarawih: string;
}

// Corrected: Ramadan 1 starts on Wednesday Feb 18 (Tuesday Feb 17 was Tarawih only, no fasting)
export const ramadan2026Data: PrayerDay[] = [
  { hijriDay: 1, hijriDate: "Ramadan 1", gregorianDate: "02/18", dayName: "WED", fajrAdhan: "5:11 AM", fajrIqamah: "5:45 AM", sunrise: "6:42 AM", dhuhrAdhan: "12:12 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:06 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:35 PM", maghribIqamah: "5:45 PM", ishaAdhan: "6:55 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 2, hijriDate: "Ramadan 2", gregorianDate: "02/19", dayName: "THU", fajrAdhan: "5:10 AM", fajrIqamah: "5:45 AM", sunrise: "6:40 AM", dhuhrAdhan: "12:12 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:07 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:36 PM", maghribIqamah: "5:46 PM", ishaAdhan: "6:56 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 3, hijriDate: "Ramadan 3", gregorianDate: "02/20", dayName: "FRI", fajrAdhan: "5:09 AM", fajrIqamah: "5:45 AM", sunrise: "6:39 AM", dhuhrAdhan: "12:12 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:07 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:38 PM", maghribIqamah: "5:48 PM", ishaAdhan: "6:57 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 4, hijriDate: "Ramadan 4", gregorianDate: "02/21", dayName: "SAT", fajrAdhan: "5:07 AM", fajrIqamah: "5:45 AM", sunrise: "6:38 AM", dhuhrAdhan: "12:11 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:08 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:39 PM", maghribIqamah: "5:49 PM", ishaAdhan: "6:58 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 5, hijriDate: "Ramadan 5", gregorianDate: "02/22", dayName: "SUN", fajrAdhan: "5:06 AM", fajrIqamah: "5:45 AM", sunrise: "6:36 AM", dhuhrAdhan: "12:11 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "3:09 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:40 PM", maghribIqamah: "5:50 PM", ishaAdhan: "6:59 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 6, hijriDate: "Ramadan 6", gregorianDate: "02/23", dayName: "MON", fajrAdhan: "5:05 AM", fajrIqamah: "5:35 AM", sunrise: "6:35 AM", dhuhrAdhan: "12:11 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:10 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:41 PM", maghribIqamah: "5:51 PM", ishaAdhan: "7:00 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 7, hijriDate: "Ramadan 7", gregorianDate: "02/24", dayName: "TUE", fajrAdhan: "5:03 AM", fajrIqamah: "5:35 AM", sunrise: "6:34 AM", dhuhrAdhan: "12:11 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:11 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:42 PM", maghribIqamah: "5:52 PM", ishaAdhan: "7:01 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 8, hijriDate: "Ramadan 8", gregorianDate: "02/25", dayName: "WED", fajrAdhan: "5:02 AM", fajrIqamah: "5:35 AM", sunrise: "6:32 AM", dhuhrAdhan: "12:11 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:11 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:43 PM", maghribIqamah: "5:53 PM", ishaAdhan: "7:02 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 9, hijriDate: "Ramadan 9", gregorianDate: "02/26", dayName: "THU", fajrAdhan: "5:00 AM", fajrIqamah: "5:35 AM", sunrise: "6:31 AM", dhuhrAdhan: "12:10 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:12 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:44 PM", maghribIqamah: "5:54 PM", ishaAdhan: "7:02 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 10, hijriDate: "Ramadan 10", gregorianDate: "02/27", dayName: "FRI", fajrAdhan: "4:59 AM", fajrIqamah: "5:35 AM", sunrise: "6:29 AM", dhuhrAdhan: "12:10 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:13 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:46 PM", maghribIqamah: "5:56 PM", ishaAdhan: "7:03 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 11, hijriDate: "Ramadan 11", gregorianDate: "02/28", dayName: "SAT", fajrAdhan: "4:58 AM", fajrIqamah: "5:35 AM", sunrise: "6:28 AM", dhuhrAdhan: "12:10 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "3:14 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:47 PM", maghribIqamah: "5:57 PM", ishaAdhan: "7:04 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 12, hijriDate: "Ramadan 12", gregorianDate: "03/01", dayName: "SUN", fajrAdhan: "4:56 AM", fajrIqamah: "5:35 AM", sunrise: "6:26 AM", dhuhrAdhan: "12:10 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:14 PM", asrIqamah: "3:40 PM", maghribAdhan: "5:48 PM", maghribIqamah: "5:58 PM", ishaAdhan: "7:05 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 13, hijriDate: "Ramadan 13", gregorianDate: "03/02", dayName: "MON", fajrAdhan: "4:55 AM", fajrIqamah: "5:25 AM", sunrise: "6:25 AM", dhuhrAdhan: "12:10 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:15 PM", asrIqamah: "3:45 PM", maghribAdhan: "5:49 PM", maghribIqamah: "5:59 PM", ishaAdhan: "7:06 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 14, hijriDate: "Ramadan 14", gregorianDate: "03/03", dayName: "TUE", fajrAdhan: "4:53 AM", fajrIqamah: "5:25 AM", sunrise: "6:23 AM", dhuhrAdhan: "12:09 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:16 PM", asrIqamah: "3:45 PM", maghribAdhan: "5:50 PM", maghribIqamah: "6:00 PM", ishaAdhan: "7:07 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 15, hijriDate: "Ramadan 15", gregorianDate: "03/04", dayName: "WED", fajrAdhan: "4:52 AM", fajrIqamah: "5:25 AM", sunrise: "6:22 AM", dhuhrAdhan: "12:09 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:17 PM", asrIqamah: "3:45 PM", maghribAdhan: "5:51 PM", maghribIqamah: "6:01 PM", ishaAdhan: "7:08 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 16, hijriDate: "Ramadan 16", gregorianDate: "03/05", dayName: "THU", fajrAdhan: "4:50 AM", fajrIqamah: "5:25 AM", sunrise: "6:20 AM", dhuhrAdhan: "12:09 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:17 PM", asrIqamah: "3:45 PM", maghribAdhan: "5:52 PM", maghribIqamah: "6:02 PM", ishaAdhan: "7:09 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 17, hijriDate: "Ramadan 17", gregorianDate: "03/06", dayName: "FRI", fajrAdhan: "4:49 AM", fajrIqamah: "5:25 AM", sunrise: "6:19 AM", dhuhrAdhan: "12:09 PM", dhuhrIqamah: "12:15 PM", asrAdhan: "3:18 PM", asrIqamah: "3:45 PM", maghribAdhan: "5:53 PM", maghribIqamah: "6:03 PM", ishaAdhan: "7:10 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 18, hijriDate: "Ramadan 18", gregorianDate: "03/07", dayName: "SAT", fajrAdhan: "4:47 AM", fajrIqamah: "5:25 AM", sunrise: "6:17 AM", dhuhrAdhan: "12:09 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "3:19 PM", asrIqamah: "3:45 PM", maghribAdhan: "5:54 PM", maghribIqamah: "6:04 PM", ishaAdhan: "7:11 PM", ishaIqamah: "8:00 PM", tarawih: "8:00 PM" },
  { hijriDay: 19, hijriDate: "Ramadan 19", gregorianDate: "03/08", dayName: "SUN", fajrAdhan: "5:45 AM", fajrIqamah: "6:15 AM", sunrise: "7:15 AM", dhuhrAdhan: "1:09 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:19 PM", asrIqamah: "4:50 PM", maghribAdhan: "6:55 PM", maghribIqamah: "7:05 PM", ishaAdhan: "8:12 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 20, hijriDate: "Ramadan 20", gregorianDate: "03/09", dayName: "MON", fajrAdhan: "5:44 AM", fajrIqamah: "6:15 AM", sunrise: "7:14 AM", dhuhrAdhan: "1:08 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:20 PM", asrIqamah: "4:50 PM", maghribAdhan: "6:56 PM", maghribIqamah: "7:06 PM", ishaAdhan: "8:12 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 21, hijriDate: "Ramadan 21", gregorianDate: "03/10", dayName: "TUE", fajrAdhan: "5:42 AM", fajrIqamah: "6:15 AM", sunrise: "7:12 AM", dhuhrAdhan: "1:08 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:20 PM", asrIqamah: "4:50 PM", maghribAdhan: "6:58 PM", maghribIqamah: "7:08 PM", ishaAdhan: "8:13 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 22, hijriDate: "Ramadan 22", gregorianDate: "03/11", dayName: "WED", fajrAdhan: "5:41 AM", fajrIqamah: "6:15 AM", sunrise: "7:11 AM", dhuhrAdhan: "1:08 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:21 PM", asrIqamah: "4:50 PM", maghribAdhan: "6:59 PM", maghribIqamah: "7:09 PM", ishaAdhan: "8:14 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 23, hijriDate: "Ramadan 23", gregorianDate: "03/12", dayName: "THU", fajrAdhan: "5:39 AM", fajrIqamah: "6:15 AM", sunrise: "7:09 AM", dhuhrAdhan: "1:08 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:22 PM", asrIqamah: "4:50 PM", maghribAdhan: "7:00 PM", maghribIqamah: "7:10 PM", ishaAdhan: "8:15 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 24, hijriDate: "Ramadan 24", gregorianDate: "03/13", dayName: "FRI", fajrAdhan: "5:38 AM", fajrIqamah: "6:15 AM", sunrise: "7:07 AM", dhuhrAdhan: "1:07 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:22 PM", asrIqamah: "4:50 PM", maghribAdhan: "7:01 PM", maghribIqamah: "7:11 PM", ishaAdhan: "8:16 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 25, hijriDate: "Ramadan 25", gregorianDate: "03/14", dayName: "SAT", fajrAdhan: "5:36 AM", fajrIqamah: "6:15 AM", sunrise: "7:06 AM", dhuhrAdhan: "1:07 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:23 PM", asrIqamah: "4:50 PM", maghribAdhan: "7:02 PM", maghribIqamah: "7:12 PM", ishaAdhan: "8:17 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 26, hijriDate: "Ramadan 26", gregorianDate: "03/15", dayName: "SUN", fajrAdhan: "5:35 AM", fajrIqamah: "6:15 AM", sunrise: "7:04 AM", dhuhrAdhan: "1:07 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:23 PM", asrIqamah: "4:55 PM", maghribAdhan: "7:03 PM", maghribIqamah: "7:13 PM", ishaAdhan: "8:18 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 27, hijriDate: "Ramadan 27", gregorianDate: "03/16", dayName: "MON", fajrAdhan: "5:33 AM", fajrIqamah: "6:05 AM", sunrise: "7:03 AM", dhuhrAdhan: "1:06 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:24 PM", asrIqamah: "4:55 PM", maghribAdhan: "7:04 PM", maghribIqamah: "7:14 PM", ishaAdhan: "8:19 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 28, hijriDate: "Ramadan 28", gregorianDate: "03/17", dayName: "TUE", fajrAdhan: "5:31 AM", fajrIqamah: "6:05 AM", sunrise: "7:01 AM", dhuhrAdhan: "1:06 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:24 PM", asrIqamah: "4:55 PM", maghribAdhan: "7:05 PM", maghribIqamah: "7:15 PM", ishaAdhan: "8:19 PM", ishaIqamah: "9:00 PM", tarawih: "9:00 PM" },
  { hijriDay: 29, hijriDate: "Ramadan 29", gregorianDate: "03/18", dayName: "WED", fajrAdhan: "5:30 AM", fajrIqamah: "6:05 AM", sunrise: "6:59 AM", dhuhrAdhan: "1:05 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:26 PM", asrIqamah: "5:00 PM", maghribAdhan: "7:06 PM", maghribIqamah: "7:16 PM", ishaAdhan: "8:20 PM", ishaIqamah: "8:30 PM", tarawih: "8:30 PM" },
  { hijriDay: 30, hijriDate: "Ramadan 30", gregorianDate: "03/19", dayName: "THU", fajrAdhan: "5:28 AM", fajrIqamah: "6:05 AM", sunrise: "6:58 AM", dhuhrAdhan: "1:05 PM", dhuhrIqamah: "1:15 PM", asrAdhan: "4:26 PM", asrIqamah: "5:00 PM", maghribAdhan: "7:07 PM", maghribIqamah: "7:17 PM", ishaAdhan: "8:21 PM", ishaIqamah: "8:30 PM", tarawih: "8:30 PM" },
];

// Eid is now Friday March 20 (shifted by one day)
export const eidData = {
  hijriDate: "Shawwal 1",
  gregorianDate: "03/20",
  dayName: "FRI",
  firstEidPrayer: "7:15 AM",
  secondEidPrayer: "9:00 AM",
  thirdEidPrayer: "10:30 AM",
};

// Tarawih only day (Tuesday Feb 17 - no fasting)
export const tarawihOnlyDay = {
  hijriDate: "Sha'ban 29",
  gregorianDate: "02/17",
  dayName: "TUE",
  ishaAdhan: "6:54 PM",
  ishaIqamah: "8:00 PM",
  tarawih: "8:00 PM",
  note: "Tarawih only - No fasting today"
};
