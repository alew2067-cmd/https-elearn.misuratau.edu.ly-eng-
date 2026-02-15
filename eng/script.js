// 1. بيانات الطلاب المحدثة
const students = {
    "06231039": {
        name: "رهام محمد الرداني",
        password: "21020044",
        department: "ai",
        finished: ["Math2", "Logic_Intro"] // مواد افتراضية أنجزتها لتفتح لها المواد الجديدة
    },
    "062310012": {
        name: "رضا الهادي عليوه بعيو",
        password: "55555111",
        department: "ai",
        finished: ["Math2", "Programming_Intro"]
    }
};

// 2. دليل المواد المتاحة (سيتم الفرز بناءً على القسم وما برمجناه هنا)
const allCourses = [
    // مواد الطالبة رهام ورضا المشتركة
    { id: "C1", name: "برمجيات حاسوب", dept: "ai" },
    { id: "C2", name: "دوائر كهربائية", dept: "ai" },
    { id: "C3", name: "رياضة 3", dept: "ai" },
    { id: "C4", name: "شبكات البيانات", dept: "ai" },
    { id: "C5", name: "نظم رقمية", dept: "ai" },
    
    // مواد خاصة برهام
    { id: "C6", name: "معمل نظم رقمية", dept: "ai" },
    { id: "C7", name: "أساسيات الذكاء الاصطناعي", dept: "ai" },
    
    // مواد خاصة برضا
    { id: "C8", name: "تعلم الآلة", dept: "ai" }
];

function login() {
    const id = document.getElementById('student-id').value;
    const pass = document.getElementById('password').value;
    const dept = document.getElementById('department').value;
    const msg = document.getElementById('msg');

    // التحقق من وجود الطالب وكلمة السر
    if (students[id] && students[id].password === pass) {
        showDashboard(id);
    } else {
        msg.style.color = "red";
        msg.innerText = "رقم القيد أو كلمة السر غير صحيحة!";
    }
}

function showDashboard(studentId) {
    const student = students[studentId];
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    document.getElementById('welcome-text').innerText = `أهلاً مهندس/ـة ${student.name}`;
    document.getElementById('student-info').innerText = `رقم القيد: ${studentId}`;

    const list = document.getElementById('courses-list');
    list.innerHTML = "";

    // منطق عرض المواد المحددة لكل طالب بناءً على طلبه
    let studentCourses = [];

    if (studentId === "06231039") {
        // مواد رهام
        studentCourses = allCourses.filter(c => ["C6", "C1", "C7", "C2", "C3", "C4"].includes(c.id));
    } else if (studentId === "062310012") {
        // مواد رضا
        studentCourses = allCourses.filter(c => ["C1", "C2", "C3", "C4", "C5", "C8"].includes(c.id));
    }

    if (studentCourses.length > 0) {
        studentCourses.forEach(course => {
            const li = document.createElement('li');
            li.innerHTML = `<span>📖</span> ${course.name}`;
            list.appendChild(li);
        });
    } else {
        list.innerHTML = "<li>لا توجد مواد متاحة حالياً.</li>";
    }
}