window.addEventListener("DOMContentLoaded", () => {
    const sem = localStorage.getItem("semester");

    if (!sem) return; // no semester means direct visit

    for (const sub of semSubData[sem]) {
        let subCard = createSubCards(sub);
        document.querySelector(".subjects").append(subCard);
    }

    // localStorage.removeItem("username");
    // localStorage.removeItem("semester");
});

let semSubData = {
    Sem1: [
        { subject: "Communication Skills", faculty: "Mrs. Grishma Ptel" },
        { subject: "MathI", faculty: "Mrs. Bharti Patidar" },
        { subject: "Digital Electronics", faculty: "Mr. Xyz" },
        { subject: "Fundamentals of Computer", faculty: "Mr. Pradeep Jatav" },
        { subject: "C Programming", faculty: "Mr. Rajesh Verma" }
    ],
    Sem2: [
        { subject: "MathII", faculty: "Mr. Dembla" },
        { subject: "DCO", faculty: "Mr. Jayesh Yadav" },
        { subject: "Digital Electronics", faculty: "Mr. Xyz" },
        { subject: "Fundamentals of Computer", faculty: "Mr. Pradeep Jatav" },
        { subject: "C Programming", faculty: "Mr. Rajesh Verma" }
    ]
}

function createSubCards(sub) {
    let subCard = document.createElement("div");
    subCard.className = "subject-card";

    subCard.innerHTML = `<h3>${sub.subject} <span class="faculty">- ${sub.faculty}</span></h3>
                        <div class="grid three-col params">
                            <label>Ability to explain
                                <select name="${sub.subject + "_explain"}" required>
                                    <option value="">Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </label>
                            <label>Timely completion
                                <select name = "${sub.subject + "_completion"}" required>
                                    <option value="">Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </label>
                            <label>Punctuality
                                <select name="${sub.subject + "_punctuality"}" required>
                                    <option value="">Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </label>
                        </div>`;

    return subCard;
}