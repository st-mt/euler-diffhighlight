// ==UserScript==
// @name         Project Euler Progress Grid Difficulty Highlight
// @namespace    https://projecteuler.net/
// @version      0.5
// @description  Add difficulty dropdown box to progress grid to highlight problems by difficulty.
// @author       David LeBlanc
// @match        https://projecteuler.net/progress
// @icon         https://www.google.com/s2/favicons?sz=64&domain=projecteuler.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pss = document.getElementById("problems_solved_section").firstElementChild;
    const select = document.createElement("select");
    select.name = "difficulty";
    select.id = "diffselect";
    select.addEventListener("change", (event) => {updateDifficulty()});
    var option;
    for (let i = 5; i <= 100; i += 5)
    {
        option = document.createElement("option");
        option.value = i.toString();
        option.appendChild(document.createTextNode(i.toString() + "%"));
        select.appendChild(option);
    }
    pss.appendChild(document.createTextNode("\u00A0\u00A0"));
    pss.appendChild(select);

    updateDifficulty();
})();

function updateDifficulty()
{
    const solvedcolor = "#6666ff";
    const unsolvedcolor = "#ccccff";
    var color;
    var parent;
    var modelement;
    var diagonal;
    const problems = document.getElementsByClassName("tooltiptext_narrow");
    const diffselect = document.getElementById("diffselect");
    const x = diffselect.selectedIndex;

    for (let i = 1; i < problems.length; i++)
    {
        if (problems[i].parentElement.nodeName == "DIV")
        {
            parent = problems[i].parentElement.parentElement.parentElement;
            modelement = problems[i].parentElement;
            diagonal = true;
        }
        else
        {
            parent = problems[i].parentElement.parentElement;
            modelement = parent;
            diagonal = false;
        }
        if (problems[i].children[2].innerHTML.includes(" " + diffselect.options[x].text))
        {
            if (parent.classList.contains("problem_unsolved"))
            {
                color = unsolvedcolor;
            }
            else
            {
                color = solvedcolor;
            }
            modelement.style.backgroundColor = color;
        }
        else
        {
            if (parent.classList.contains("problem_unsolved"))
            {
                if (diagonal)
                {
                    color = "var(--color-background-variation-1)"
                }
                else
                {
                    color = "var(--color-background-default)";
                }
            }
            else
            {
                if (diagonal)
                {
                    color = "var(--color-background-variation-1)";
                }
                else
                {
                    color = "var(--color-orange)";
                }
            }
            modelement.style.backgroundColor = color;
        }
    }
}