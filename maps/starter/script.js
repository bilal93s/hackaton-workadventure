/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentPopup = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

// Affichage de la popup Waiting Room
WA.room.onEnterZone('waiting', () => {
    currentPopup =  WA.ui.openPopup("waitingPopup","Vous êtes dans la Waiting Room, veuillez restez dans la salle jusqu'à que quelqun vienne vous chercher." , []);
})

WA.room.onLeaveZone('waiting', closePopUp)