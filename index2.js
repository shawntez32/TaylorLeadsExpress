const mongoose = require('mongoose');

const searchContent = async searchText => {
    const res = await fetch('states.json');
    const state = await res.json();

    let matches = state.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
    };

    let txt = "";
    matches.forEach(myFunction);
    console.log(matches.length);
    document.getElementById("matchList").innerHTML = txt;

    function myFunction(value) {
      txt += `<h4><a href=>${value.name},<span> ${value.abbr}</span></a></h4><br>`;
}};