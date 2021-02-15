import React, { useState } from 'react';

function Result(params) {


    return (
        <form>
            <br/>
            <div class="container">
                <div class="row">
                    <div className="col">
                        <label>
                            ID:
                        <input id="tavaraid"></input>
                        </label>
                    </div>
                    <div className="col">
                        <label>
                            Nimi:
                            <input type="text" name="tavaranimi"></input>
                        </label>
                    </div>
                    <div className="col">
                        <label>
                            Kategoria:
                            <input type="text" name="tavarakategoria" />
                        </label>
                    </div>
                </div>
            </div>

        </form>

    )

}

export default Result;