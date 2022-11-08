const newCommentHandler = async (event) => {
    event.preventDefault();
    console.log("Happening It Be");
  
    const content = document.querySelector('#comment-content').value.trim();

    console.log("TESTING>>>>"+content);
  
    // if (content) {
    //   const response = await fetch(`/api/comments/create`, {
    //     method: 'POST',
    //     body: JSON.stringify({ content }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   console.log(response);
  
    //   if (response.ok) {
    //     document.location.reload();
    //   } else {
    //     alert('Failed to create comment');
    //   }
    // }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);