function mailDesign (codeNo, name) {
    return `

    <head>
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Helvetica, sans-serif;
            font-size: 18px;
            color: #121212;
            /* position: relative; */
        }
        
        .container {
            width: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .heading {
            text-align: center;
            font-weight: 400;
            font-size: 22px;
        }
        
        .container .inner {
            margin-top: 20px;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            text-align: center;
        }
        
        .container .inner .box span {
            font-size: 58px;
            display: inline-block;
            margin-bottom: 12px;
        }
        
        .container .inner .box .small-txt {
            line-height: 1.8rem;
            color: #1212128c;
            margin-bottom: 10px;
        }
        
        .container .inner .box .screen {
            background-color: rgba(156, 235, 255, 0.356);
            width: 50%;
            margin: 0 auto;
            padding: 10px 0;
            border-radius: 8px;
        }
        
        .container .inner .box .screen p {
            font-weight: bold;
            font-size: 32px;
            color: #333333;
        }
        
        .footer {
            font-size: 12px;
            text-align: center;
            color: #949494;
            margin-top: 24px;
            line-height: 1.2rem;
        }

        @media only screen and (min-width: 320px) and (max-width: 376px) {
            .container {
                width: 90%;
            }
            .container .inner .box .screen {
                width: 98%;
            }
        }
        @media only screen and (min-width: 376px) and (max-width: 426px) {
            .container {
                width: 90%;
            }
            .container .inner .box .screen {
                width: 98%;
            }
        }
        @media only screen and (min-width: 426px) and (max-width: 769px) {
            .container {
                width: 70%;
            }
            .container .inner .box .screen {
                width: 70%;
            }
        }

        </style>
    </head>
    <body>

        <div class="container">
            <p class="heading">Here's your MiniKart launch code, @${name}!</p>
            <div class="inner">
                <div class="box">
                    <span>🤖</span>
                    <p class="small-txt">Continue signing up for MiniKart by entering the code below:</p>
                    <div class="screen">
                        <p>${codeNo}</p>
                    </div>
                </div>
            </div>
            <p class="footer">You’re receiving this email because you 
                recently created a new MiniKart account. 
                If this wasn’t you, please ignore this email.</p>
        </div>

        
        
    </body>
`
}

module.exports = mailDesign