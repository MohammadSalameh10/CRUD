const name = document.querySelector('#courseName');
const category = document.querySelector('#courseCategory');
const price = document.querySelector('#coursePrice');
const description = document.querySelector('#courseDescription');
const capacity = document.querySelector('#courseCapacity');
const addBtn = document.querySelector('#click');
let courses = [];
const deleteAllBtn = document.querySelector('#deleteBtn');
const serach = document.querySelector('#search');
const updateBtn = document.querySelector('#updateBtn');

if (localStorage.getItem('courses') !== null) {
    courses = JSON.parse(localStorage.getItem('courses'));
    displayCourses();
}


name.addEventListener('input', () => {
    const namePattern = /^[A-Z][a-z]{3,10}$/;
    if (!namePattern.test(name.value)) {
        name.classList.add('is-invalid');
        name.classList.remove('is-valid');
        document.querySelector('.invalid-name').textContent = 'please start with capital letter and name must be between 3 and 10 characters';
    } else {
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
        document.querySelector('.invalid-name').textContent = '';
    }
    validateAdd();
    validateUpdate()
});

category.addEventListener('input', () => {
    const categoryPattern = /^[A-Z][a-z]{3,20}$/;
    if (!categoryPattern.test(category.value)) {
        category.classList.add('is-invalid');
        category.classList.remove('is-valid');
        document.querySelector('.invalid-category').textContent = 'please start with capital letter and category must be between 3 and 20 characters';
    } else {
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
        document.querySelector('.invalid-category').textContent = '';
    }
    validateAdd();
    validateUpdate()
});

price.addEventListener('input', () => {
    const pricePattern = /^[1-9][0-9]{2,3}$/;
    if (!pricePattern.test(price.value)) {
        price.classList.add('is-invalid');
        price.classList.remove('is-valid');
        document.querySelector('.invalid-price').textContent = 'price must between 100 - 9999';
    } else {
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
        document.querySelector('.invalid-price').textContent = '';
    }
    validateAdd();
    validateUpdate()
});

description.addEventListener('input', () => {
    const descriptionPattern = /^[A-Z].*$/;
    if (!descriptionPattern.test(description.value)) {
        description.classList.add('is-invalid');
        description.classList.remove('is-valid');
        document.querySelector('.invalid-description').textContent = 'please start with capital letter';
    } else {
        description.classList.remove('is-invalid');
        description.classList.add('is-valid');
        document.querySelector('.invalid-description').textContent = '';
    }
    validateAdd();
    validateUpdate()
});

capacity.addEventListener('input', () => {
    const capacityPattern = /^(1[5-9]|[2-4][0-9]|5[0-5])$/;
    if (!capacityPattern.test(capacity.value)) {
        capacity.classList.add('is-invalid');
        capacity.classList.remove('is-valid');
        document.querySelector('.invalid-capacity').textContent = 'capacity must between 15 - 55';
    } else {
        capacity.classList.remove('is-invalid');
        capacity.classList.add('is-valid');
        document.querySelector('.invalid-capacity').textContent = '';
    }
    validateAdd();
    validateUpdate()
});

addBtn.disabled = true;
deleteAllBtn.disabled = true;
function validateAdd() {
    if (name.classList.contains('is-valid') && category.classList.contains('is-valid') && price.classList.contains('is-valid') && description.classList.contains('is-valid') && capacity.classList.contains('is-valid')) {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
}

function validateUpdate() {
    if (name.classList.contains("is-invalid") || category.classList.contains("is-invalid") || price.classList.contains("is-invalid") || description.classList.contains("is-invalid") || capacity.classList.contains("is-invalid")) {
        updateBtn.disabled = true;
    } else {
        updateBtn.disabled = false;
    }
}

function clearInput() {
    name.value = '';
    category.value = '';
    price.value = '';
    description.value = '';
    capacity.value = '';
    addBtn.disabled = true;
    name.classList.remove('is-valid');
    category.classList.remove('is-valid');
    price.classList.remove('is-valid');
    description.classList.remove('is-valid');
    capacity.classList.remove('is-valid');
    name.classList.remove('is-invalid');
    category.classList.remove('is-invalid');
    price.classList.remove('is-invalid');
    description.classList.remove('is-invalid');
    capacity.classList.remove('is-invalid');
    document.querySelector('.invalid-name').textContent = '';
    document.querySelector('.invalid-category').textContent = '';
    document.querySelector('.invalid-price').textContent = '';
    document.querySelector('.invalid-description').textContent = '';
    document.querySelector('.invalid-capacity').textContent = '';
    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const course = {
        name: name.value,
        category: category.value,
        price: price.value,
        description: description.value,
        capacity: capacity.value
    };

    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));

    Swal.fire({
        text: "Course added successfully",
        icon: "success",
        showConfirmButton: false
    });

    displayCourses();
    clearInput();
    deleteAllBtn.disabled = false;
});

function displayCourses() {

    const result = courses.map((course, index) => {
        return `<tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><button class="btn btn-info" onclick="updateCourse(${index})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${index})">Delete</button></td>
        </tr>`
    }).join('');
    document.querySelector('#data').innerHTML = result;
}

function deleteCourse(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayCourses();
            if (courses.length === 0) {
                deleteAllBtn.disabled = true;
            }
            Swal.fire({
                title: "Deleted!",
                text: "Your Course has been deleted.",
                icon: "success"
            });
        }
    });
}

deleteAllBtn.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('courses');
            courses = [];
            displayCourses();
            Swal.fire({
                title: "Deleted!",
                text: "Your Courses has been deleted.",
                icon: "success"
            });
        }
    });
    deleteAllBtn.disabled = true;
});

serach.addEventListener('input', (e) => {

    const keyword = e.target.value;
    const courseResult = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    });

    const result = courseResult.map((course, index) => {
        return `<tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><button class="btn btn-info" onclick="updateCourse(${index})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${index})">Delete</button></td>
        </tr>`
    }).join('');
    document.querySelector('#data').innerHTML = result;
});

updateBtn.classList.add('d-none');

let i;
function updateCourse(index) {
    i = index;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    const course = courses[index];
    name.value = course.name;
    category.value = course.category;
    price.value = course.price;
    description.value = course.description;
    capacity.value = course.capacity;
}

updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const course = {
        name: name.value,
        category: category.value,
        price: price.value,
        description: description.value,
        capacity: capacity.value
    };
    courses[i] = course;
    localStorage.setItem('courses', JSON.stringify(courses));
    Swal.fire({
        text: `${courses[i].name} updated successfully`,
        icon: "success",
        showConfirmButton: false
    });

    displayCourses();
    clearInput();
});
