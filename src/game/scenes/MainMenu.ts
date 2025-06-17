import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor()
    {
        super('MainMenu');
    }

    create()
    {
        this.background = this.add.image(385, 512, 'bg_mainMenu');

        this.logo = this.add.image(this.scale.width / 2, this.scale.height * 0.2, 'logo_am').setDepth(100);

        this.title = this.add.text(this.scale.width / 2, this.scale.height * 0.35, 'Un juego de estategia', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.title = this.add.text(this.scale.width / 2, this.scale.height * 0.4, '!!! 100% Mexicano !!!', {
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.title = this.add.text(this.scale.width / 2, this.scale.height * 0.45, 'Que promueve su legado cultural', {
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const loginBtn = this.add.text(this.scale.width / 2, this.scale.height * 0.60, 'Inicia sesión con Google', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center',
            backgroundColor: '#4285F4',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive().setDepth(100);

        loginBtn.on('pointerdown', () =>
        {
            console.log('Booton para inicio de sesión')
        });
        EventBus.emit('current-scene-ready', this);
    }

    changeScene()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    moveLogo(vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        }
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () =>
                {
                    if (vueCallback)
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
