import React, { useState } from 'react';

function Result(params) {
    return (
        <form>
            <br/>
            <div class="container bg-info">
                <div class = "row">
                    <div class = "col">
                        <img src = "logo.svg"></img>
                    </div>
                    <div class = "col">
                        <p>Nimi: </p>
                    </div>
                    <div class = "col">
                        <p>Kategoria: </p>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col">

                    </div>
                    <div class = "col">
                        <p>Hyllypaikka: </p>
                    </div>
                    <div class = "col">
                        <p>Määrä varastossa: </p>
                    </div>
                </div>
            </div>

        </form>

    )

}

export default Result;