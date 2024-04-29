const staffInfo = document.querySelectorAll('.staff-info');
const staffDetail = document.getElementById('staff-detail');
const staffGrid = document.getElementById('staff-grid');

staffInfo.forEach((s) => {
    s.addEventListener('click', async (e) => {
        const id = s.getAttribute('data-id');
        const response = await fetch(`http://localhost:3000/staffs/detail/${id}`)
        const responseData = await response.json();
        
        staffGrid.classList.remove('col-span-3');
        staffGrid.classList.add('lg:col-span-2', 'hidden', 'lg:block');
        staffDetail.classList.add('block', 'lg:col-span-1', 'col-span-3');
        staffDetail.classList.remove('hidden');
        
        const fullname = document.getElementById('fullname');
        const username = document.getElementById('username');
        document.getElementById('userImage').src = `/images/users/${responseData.profile_picture}`;

        fullname.textContent = responseData.fullname;
        username.textContent = responseData.username;
        const staffDetailContent = document.getElementById('staff-detail-content');

        
        const tr1 = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = 'Email:';
        td2.textContent = `${responseData.email}`;
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        const tr2 = document.createElement('tr');
        
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        td3.textContent = 'Phone number:';
        td4.textContent = `${!responseData.phone ? '' : responseData.phone}`;
        tr2.appendChild(td3);
        tr2.appendChild(td4);

        const tr3 = document.createElement('tr');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        td5.textContent = 'Date of birth:';
        td6.textContent = `${!responseData.date_of_birth ? '' : responseData.date_of_birth}`;
        tr3.appendChild(td5);
        tr3.appendChild(td6);
        staffDetailContent.replaceChildren(tr1, tr2, tr3);
        
    })
})

function closeDetail() {
    staffGrid.classList.remove('lg:col-span-2', 'hidden');
    staffGrid.classList.add('col-span-3')

    staffDetail.classList.add('hidden');
    staffDetail.classList.remove('block');
}