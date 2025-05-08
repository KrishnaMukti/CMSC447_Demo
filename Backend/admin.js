// Fetch and fill course data
async function searchCourse() {
    const id = document.getElementById("searchCourseId").value;
    const res = await fetch(`/api/admin/${id}`);
    const course = await res.json();

    if (course.error) {
        alert("Course not found");
        return;
    }

    document.getElementById("courseId").value = course.courseId;
    document.getElementById("title").value = course.title;
    document.getElementById("credits").value = course.credits;
    document.getElementById("description").value = course.description;
}

// Send updated course data
async function updateCourse() {
    const updatedCourse = {
        courseId: document.getElementById("courseId").value,
        title: document.getElementById("title").value,
        credits: parseInt(document.getElementById("credits").value),
        description: document.getElementById("description").value
    };

    const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedCourse)
    });

    if (res.ok) {
        alert('Course updated successfully!');
    } else {
        alert('Failed to update course.');
    }
}
