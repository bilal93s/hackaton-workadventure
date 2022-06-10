/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentPopup = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
var timerVariable = setInterval(countUpTimer, 1000);
var totalSeconds = 0;

// WA.room.onEnterLayer('clockZone', () => {
//     currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
// })
// WA.room.onLeaveLayer('clockZone', closePopUp)

WA.room.onEnterLayer("clockZone").subscribe(() => {
    currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
});

WA.room.onLeaveLayer("clockZone").subscribe(() => {
    myLayerSubscriber.unsubscribe();
});

WA.room.onEnterLayer("notificationZone").subscribe(() => {
    countUpTimer();
    currentPopup = WA.ui.openPopup("notificationPopup", "Temps d'attente : " + totalSeconds + " secondes", []);
});

WA.room.onLeaveLayer("notificationZone").subscribe(() => {
    myLayerSubscriber.unsubscribe();
});

function closePopUp() {
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
function countUpTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);
}
