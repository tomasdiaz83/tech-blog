const newComment = async(e) => {
    e.preventDefault();
    console.log("Happening It Be!");
  
    const content = document.getElementById('comment-content').value.trim();
    const post_id = document.getElementById('post-ID-Data').dataset.postid;

    console.log(content);
    console.log(post_id);
  
    if (content) {
      const response = await fetch(`/api/comments/create`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
};

document.querySelector('#newComment').addEventListener('submit', newComment);