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

//Creates lists and variables from database
function viewModelLogo() {
    self = this;
    self.logosList = ko.observableArray();
    self.selectedLogo = ko.observable({logo:''});
  
    self.titleInfo = ko.computed(() =>{
        return self.selectedLogo().participantTitle 
    });
     self.logosInfo = ko.computed(()=>{
         return self.selectedLogo().info
     });
     self.logoImg = ko.computed(()=>{
         return self.selectedLogo().img
     });
    self.linksLogos = ko.computed(function(){
        return self.selectedLogo().LogoLinks
    });
    
   }
  //Applies viewModel for participants.html
   ko.applyBindings(viewModelLogo, document.getElementById("participants"));

function CreateLogos(request){

    //Creates an array for each variable
    var participantTitle = [];
    var img = [];
    
    for (i = 0; i < request.length; i++) {
        participantTitle[i] = request[i].participantTitle.toString();
        img[i] = request[i].img;

        // console.log(participantTitle[i])
        // console.log(img[i])
    }

}

//Function runs when image is clicked
function openInfobox(el){

    //Assigns varibles
    var introBox = jQuery('#participants-intro-text');
    var infoBox = jQuery('#participants-info-display');

    //Displays correct infobox
    introBox.hide();
    infoBox.show();

    var image = el;
    console.log(image);

    var attribute = image.getAttribute("src");
    console.log(attribute);

    for(var i=0; i<logosList().length; i++){
        if(logosList()[i].img==attribute){
            selectedLogo(logosList()[i]);
            console.log(selectedLogo());
            return;
        }
    }
}
