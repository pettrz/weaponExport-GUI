//PARTICIPANTS

//Define request to get stats from database with api
var xhttpLogos = new XMLHttpRequest();
xhttpLogos.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpLogosList = JSON.parse(xhttpLogos.response);

    for (var i = 0; i < xhttpLogosList.length; i++) {  
        logosList.push(xhttpLogosList[i]);

        //Outprints all titles of participants
        //  console.log(logosList()[i].participantTitle)
    }
    
    //Creates function for all images
    CreateLogos(xhttpLogosList);

    }
}

xhttpLogos.open('GET', 'http://localhost:1137/participants', true);
xhttpLogos.send();

//Creates lists and variables from databsae
function viewModelLogo() {
    self = this;
    self.logosList = ko.observableArray();
    self.selectedLogo = ko.observable({code:''});
  
    self.titleInfo = ko.computed(() =>{
        return self.selectedLogo().participantTitle
    });
    // self.statsInfo = ko.computed(()=>{
    //     return self.selectedLogo().info
    // });
    self.linksLogos = ko.computed(function(){
        return self.selectedLogo().LogoLinks
    });
    
   }
  
   ko.applyBindings(viewModelLogo, document.getElementById("participants"));

function CreateLogos(request){

    var participantTitle = [];
    var img = [];

    for (i = 0; i < request.length; i++) {
        participantTitle[i] = request[i].participantTitle.toString();
        img[i] = request[i].img;

        // console.log(participantTitle[i])
        console.log(img[i])
    }

    //Converts image-links to images


}