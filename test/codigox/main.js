var socket = io.connect("http://localhost:3000", { forceNew: true });

function render(data) {
    var html = data
      .map(function (elem, index) {
        return `<div>
                   <strong>${elem.author}</strong>:
                   <em>${elem.text}</em>
          </div>`;
      })
      .join(" ");
  
    document.getElementById("messages").innerHTML = html;
  }
  
  socket.on("messages", function (data) {
    render(data);
  });