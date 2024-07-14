import { I_CheatItem } from "./types/item"

const tagdata = {
    laravel : {name:"Laravel",color:"#ff6000"},
    git : {name:"Git",color:"#7d00ff"},
    typescript : {name:"TypeScript",color:"#0084ff"},
    other : {name:"Other",color:"#c9ab81"},
    fanclub : {name:"FanClub",color:"#c9ab81"},
    jleague : {name:"J-League",color:"#c9ab81"},
}

export const cheatItems:I_CheatItem[] = [
    {
        id:'1',
        title:"Cretate a laravel migration file",
        text: "",
        codes:["php artisan make:migration create_users_table --create=users"],
        tags:[tagdata.laravel],
    },
    {
        id:'2',
        title:"Run a single laravel migration file",
        text: "",
        codes:["php artisan migrate --path=database/migrations/2020_10_29_000000_create_users_table.php"],
        tags:[tagdata.laravel],
    },
    {
        id:'3',
        title:"Hard reset local branch",
        text: "to sync with origin : checkout to desired branch",
        codes:["git reset --hard origin/[branch-name]"],
        tags:[tagdata.git],
    },
    {
        id:'4',
        title:"See commits list",
        text: "as one line",
        codes:["git log --oneline"],
        tags:[tagdata.git],
    },
    {
        id:'5',
        title:"LOCAL test user",
        text: "YM - OTP id and Birthdate",
        codes:["999009130","2020-01-01"],
        tags:[tagdata.other,tagdata.fanclub,tagdata.jleague],
    },
    {
        id:'6',
        title:"DEV CSS test user",
        text: "YM - OTP id and Birthdate",
        codes:["999009038","2020-01-01"],
        tags:[tagdata.other,tagdata.fanclub,tagdata.jleague],
    },
]
