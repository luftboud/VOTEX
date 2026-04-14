export const testMeetingsResults = {
    1: {
        id: 1,
        title: "Budget Allocation Discussion",
        date: "15/03/2026",
        participants: 24,
        questions: [
            {
                id: "1-1",
                title: "Збільшити бюджет на студентські ініціативи?",
                answers: [
                    { option: "Так", votes: 16, percent: 67 },
                    { option: "Ні", votes: 5, percent: 21 },
                    { option: "Утримався", votes: 3, percent: 12 },
                ],
            },
            {
                id: "1-2",
                title: "Спрямувати кошти на модернізацію аудиторій?",
                answers: [
                    { option: "Так", votes: 14, percent: 58 },
                    { option: "Ні", votes: 7, percent: 29 },
                    { option: "Утримався", votes: 3, percent: 13 },
                ],
            },
        ],
    },
    2: {
        id: 2,
        title: "Spring Festival Planning",
        date: "20/03/2026",
        participants: 28,
        questions: [
            {
                id: "2-1",
                title: "Проводити фестиваль два дні?",
                answers: [
                    { option: "Так", votes: 18, percent: 64 },
                    { option: "Ні", votes: 8, percent: 29 },
                    { option: "Утримався", votes: 2, percent: 7 },
                ],
            },
            {
                id: "2-2",
                title: "Запросити зовнішніх виконавців?",
                answers: [
                    { option: "Так", votes: 20, percent: 71 },
                    { option: "Ні", votes: 6, percent: 21 },
                    { option: "Утримався", votes: 2, percent: 8 },
                ],
            },
        ],
    },
    3: {
        id: 3,
        title: "Student Welfare Proposals",
        date: "25/03/2026",
        participants: 22,
        questions: [
            {
                id: "3-1",
                title: "Запустити програму ментального здоров'я?",
                answers: [
                    { option: "Так", votes: 15, percent: 68 },
                    { option: "Ні", votes: 4, percent: 18 },
                    { option: "Утримався", votes: 3, percent: 14 },
                ],
            },
        ],
    },
    4: {
        id: 4,
        title: "Campus Safety Measures",
        date: "28/02/2026",
        participants: 26,
        questions: [
            {
                id: "4-1",
                title: "Розширити освітлення біля гуртожитків?",
                answers: [
                    { option: "Так", votes: 19, percent: 73 },
                    { option: "Ні", votes: 4, percent: 15 },
                    { option: "Утримався", votes: 3, percent: 12 },
                ],
            },
        ],
    },
    5: {
        id: 5,
        title: "Sports Event Organization",
        date: "15/02/2026",
        participants: 20,
        questions: [
            {
                id: "5-1",
                title: "Провести міжфакультетський турнір?",
                answers: [
                    { option: "Так", votes: 13, percent: 65 },
                    { option: "Ні", votes: 5, percent: 25 },
                    { option: "Утримався", votes: 2, percent: 10 },
                ],
            },
        ],
    },
};

export const testArchiveMeetings = Object.values(testMeetingsResults).map((meeting) => ({
    id: meeting.id,
    title: meeting.title,
    date: meeting.date,
    participants: meeting.participants,
    questions: meeting.questions.length,
}));