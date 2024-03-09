var app = new Vue({
    el: '#app',
    data: {
      scanner: null,
      activeCameraId: null,
      cameras: [],
      scans: [],
      socket: io.connect("http://localhost:3000", { forceNew: true })
    },
    mounted: function () {
      var self = this;
      //var socket = io.connect("http://localhost:3000", { forceNew: true });
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
      /*
      self.socket.on("messages", function (data) {
        render(data);
      });*/
      
      self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
      self.scanner.addListener('scan', function (content, image) {
          console.log("elemento escaneado: "+content)
          
          self.socket.on("messages",function(data){
            console.log(data)
            data.map(function(elem,index){
              console.log("autor: "+elem.author)
              //self.scans.unshift({ date: +(Date.now()), content: elem.author });
            })
            
          });
        //este codigo ayuda a mandar los datos a la vista de uno por uno
        //self.scans.unshift({ date: +(Date.now()), content: content });
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        self.cameras = cameras;
        if (cameras.length > 0) {
          self.activeCameraId = cameras[0].id;
          self.scanner.start(cameras[0]);
        } else {
          console.error('No se enconro camaras disponibles');
        }
      }).catch(function (e) {
        console.error(e);
      });
    },
    methods: {
      formatName: function (name) {
        return name || '(unknown)';
      },
      selectCamera: function (camera) {
        this.activeCameraId = camera.id;
        this.scanner.start(camera);
      }
    }
  });