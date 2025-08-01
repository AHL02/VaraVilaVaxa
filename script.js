const members = document.querySelectorAll('.SmallMember');

// Add a click function to each one
members.forEach(member => {
    member.addEventListener('click', () => {
        alert(`You clicked member with ID: ${member.id}`);
    });
});