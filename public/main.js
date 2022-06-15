const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/trees', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: '2000-03-20',
            variety: 'chestnuts'
        })
    })
  })