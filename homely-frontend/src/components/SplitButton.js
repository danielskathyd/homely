import React from "react";
import "./dropdown.css"

const options = [
  "All",
  "Cooking",
  "Art",
  "Gaming",
  "Health"
];

export default function SplitButton() {
  return (
    <div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div id="myDropdown" class="dropdown-content">
      <a href="#all">All</a>
      <a href="#cooking">Cooking</a>
      <a href="#art">Art</a>
      <a href="#gaming">Gaming</a>
      <a href="#health">Health</a>
    </div>
    </div>
  );
}
