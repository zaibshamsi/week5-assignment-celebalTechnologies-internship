let editMode = false;
let editId = null;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("talentForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            class: document.getElementById("class").value,
            talent: document.getElementById("talent").value,
        };

        try {
            let response
            if (editMode && editId) {
                response = await fetch(`/student/update/${editId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData),
                })
            } else {
                response = await fetch("/student/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
            }

            const result = await response.json();
            alert(editMode ? "Student updated successfully " : "student created successfully");
            form.reset();
             editMode = false;
             editId = null;

            document.getElementById("btn").click();
            // addTalentCard(result.student);

        } catch (error) {
            console.error("Submission error:", error);
            alert("Request failed: " + error.message);
        }
    });
});

document.getElementById("btn").addEventListener("click", async () => {
    try {
        const response = await fetch("/student/list");
        const result = await response.json();

        console.log("Full response:", result);
        if (!response.ok) {
            alert("Failed to fetch talents: " + result.message);
            return;
        }

        // ✅ Defensive check
        if (!Array.isArray(result.students)) {
            console.error("Expected 'students' to be an array but got:", result.students);
            alert("Unexpected response from server.");
            return;
        }

        const container = document.getElementById("talentList");
        container.innerHTML = "";

        result.students.forEach(student => addTalentCard(student));
    } catch (error) {
        console.error("Error fetching list:", error);
        alert("Could not load student list.");
    }
});

document.getElementById("hidebtn").addEventListener("click", async () => {
    const form = document.getElementById("talentList")
    form.innerHTML = "";
})

function addTalentCard({ name, class: studentClass, talent, _id }) {

    const container = document.getElementById("talentList");

    const card = document.createElement("div")
    card.className = "talent-card";

    card.innerHTML = `
        <h3 class="talent-name">${name}</h3>
        <button class="btnEdit" type="submit"> <h3>✏️</h3></button>
        <p class="talent-class">Class:${studentClass}</p>
        <p class="talent-skill">talent:${talent}</p>
        <button class="btnDelete" type="submit">Delete</button>

    `

    card.querySelector(".btnDelete").addEventListener("click", async () => {
        try {
            const confirmDelete = confirm(`Are you sure to delete ${name}`);
            if (!confirmDelete) return;

            const response = await fetch(`/student/delete/${_id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                const errorData = await response.json();
                alert("Delete failed: " + errorData.message);
                return;
            }

            card.remove();
            alert("Student deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student.");
        }

    })

    card.querySelector(".btnEdit").addEventListener("click", async () => {
        console.log("Edit button clicked")
        document.getElementById("name").value = name;
        document.getElementById("class").value = studentClass;
        document.getElementById("talent").value = talent;

        editMode = true;
        editId = _id;

        document.getElementById("name").scrollIntoView({ behavior: "smooth" });
    })
    container.appendChild(card);
}

