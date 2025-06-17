import { Component, OnInit } from "@angular/core";
import Phaser from "phaser";
import StartGame from "../game/main";
import { EventBus } from "../game/EventBus";

@Component({
    selector: 'phaser-game',
    template: '<div id="game-container" style="width: 95vw; height: 95vh;"></div>',
    standalone: true,
})
export class PhaserGame implements OnInit
{
    scene: Phaser.Scene;
    game: Phaser.Game;
    sceneCallback: (scene: Phaser.Scene) => void;

    ngOnInit ()
    {
        this.game = StartGame('game-container');

        EventBus.on('current-scene-ready', (scene: Phaser.Scene) =>
        {
            this.scene = scene;

            if (this.sceneCallback)
            {
                this.sceneCallback(scene);
            }
        });
    }

    ngOnDestroy ()
    {
        if (this.game)
        {
            this.game.destroy(true);
        }
    }
}
