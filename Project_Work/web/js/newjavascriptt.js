/*
 stats 2014-11-14
*/
var stats=angular.module("stats",["ngRoute","ngCookies","ngAnimate","ui.bootstrap","ui.slider"]);
stats.config(["$animateProvider",function($animateProvider){
    $animateProvider.classNameFilter(/angular-animate/)
    }]);
stats.config(["$tooltipProvider",function($tooltipProvider){
    $tooltipProvider.options({
        placement:"top",
        animation:true,
        popupDelay:0,
        appendToBody:true
    })
    }]);
stats.run(["$document","$modal",function($document,$modal){
    $document.on("click",'span[rel="modal"]',function(e){
        var $this=angular.element(this);
        var type=$this.attr("type");
        var title=$this.attr("title");
        var href=$this.attr("href");
        var modalInstance=$modal.open({
            templateUrl:"/templates/overlay/modal.html",
            controller:"ModalInstanceCtrl",
            size:"lg",
            windowClass:type,
            resolve:{
                url:function(){
                    return href
                    },
                title:function(){
                    return title
                    },
                type:function(){
                    return type
                    }
                }
        })
    })
}]);
stats.run(["$location","$filter","$modal",function($location,$filter,$modal){
    var searchObject=$location.search();
    if(searchObject.mtype){
        var type=searchObject.mtype;
        var title=searchObject.mtitle;
        searchObject.mtype="";
        searchObject.mtitle="";
        var search=$filter("param")(searchObject);
        var modalurl="";
        switch(type){
            case"shotchart":
                modalurl="/shotchart/#!/?"+search;
                break;
            case"cvp":
                modalurl="http://stats.nba.com/cvp.html?"+search;
                break;
            case"tracking":
                modalurl="/playlist/#!/movement?"+search;
                break;
            case"movement":
                modalurl="/movement/#!/?"+search;
                break;
            default:
                return
                }
                var modalInstance=$modal.open({
            templateUrl:"/templates/overlay/modal.html",
            controller:"ModalInstanceCtrl",
            size:"lg",
            windowClass:type,
            resolve:{
                url:function(){
                    return modalurl
                    },
                title:function(){
                    return title
                    },
                type:function(){
                    return type
                    }
                }
        })
}
}]);
stats.run(["$rootScope","$location",function($rootScope,$location){
    window.IS_MOBILE=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $(".nav-buttons").on("mouseenter",".button",function(){
        $(this).find(".drop").show()
        }).on("mouseleave",".button",function(){
        $(this).find(".drop").hide()
        });
    $(".sap-header").click(function(){
        var URL=$("#sapSponserClickThroughURL").attr("href");
        if(URL)window.open(URL,"_blank")
            });
    $("#stats-team-summary .sap-sponsor").click(function(){
        var URL=$("#sapSponserClickThroughURL").attr("href");
        if(URL)window.open(URL,"_blank")
            });
    $("#stats-player-summary .sap-sponsor").click(function(){
        var URL=$("#sapSponserClickThroughURL").attr("href");
        if(URL)window.open(URL,"_blank")
            });
    $(".stats-beyond-the-numbers .sap-logo").click(function(){
        var URL=$("#sapBeyondClickThroughURL").attr("href");
        if(URL)window.open(URL,"_blank")
            });
    $rootScope.$on("$routeChangeSuccess",function(scope,route){
        var path=route.$$route.originalPath;
        if(path.substr(-1)!="/"){
            return
        }
        if(typeof callOmniture!="undefined"){
            callOmniture()
            }
            if(typeof ga!="undefined"){
            ga("send","event","route-change",route.$$route.originalPath,JSON.stringify(route.params))
            }
        })
}]);
stats.constant("FEEDS_CONFIG",{
    prefix:"/stats/",
    debug:false,
    liveGameTrackerFeedUpdateInterval:1e4,
    liveFeedUpdateInterval:2e4,
    staticFeedUpdateInterval:3e5,
    requestMethod:"get",
    boxscore:"boxscore",
    boxscoreBase:"boxscore",
    boxscorePlayerTracking:"boxscore",
    boxscorePlayByPlay:"playbyplay",
    boxscoreAdvanced:"boxscoreadvanced",
    boxscoreMisc:"boxscoremisc",
    boxscoreScoring:"boxscorescoring",
    boxscoreUsage:"boxscoreusage",
    boxscoreFourFactors:"boxscorefourfactors",
    boxscoreSummary:"boxscoresummaryv2",
    boxscoreTraditional_2:"boxscoretraditionalv2",
    boxscoreAdvanced_2:"boxscoreadvancedv2",
    boxscoreMisc_2:"boxscoremiscv2",
    boxscoreScoring_2:"boxscorescoringv2",
    boxscoreUsage_2:"boxscoreusagev2",
    boxscoreFourFactors_2:"boxscorefourfactorsv2",
    boxscorePlayerTracker_2:"boxscoreplayertrackv2",
    boxscorePlayByPlay_2:"playbyplayv2",
    draftCombineAgility:"draftcombinedrillresults",
    draftCombineAnthro:"draftcombineplayeranthro",
    draftCombineNonstationary:"draftcombinenonstationaryshooting",
    draftCombineSpotup:"draftcombinespotshooting",
    draftCombineSummary:"draftcombinestats",
    franchiseHistory:"franchisehistory",
    homepageLeaders:"homepageleaders",
    homepageLeaders2:"homepagev2",
    leagueTeamStats:"leaguedashteamstats",
    leagueTeamClutch:"leaguedashteamclutch",
    leagueTeamShotLocations:"leaguedashteamshotlocations",
    leaguePlayerStats:"leaguedashplayerstats",
    leaguePlayerClutch:"leaguedashplayerclutch",
    leaguePlayerShotLocations:"leaguedashplayershotlocations",
    leagueLineups:"leaguedashlineups",
    leagueLeaders:"leagueleaders",
    leagueLeadersTiles:"leaderstiles",
    playerList:"commonallplayers",
    playerSummary:"commonplayerinfo",
    playerProfile:"playerprofile",
    playerProfile2:"playerprofilev2",
    playerGeneralSplits:"playerdashboardbygeneralsplits",
    playerOpponentSplits:"playerdashboardbyopponent",
    playerLastNGamesSplits:"playerdashboardbylastngames",
    playerInGameSplits:"playerdashboardbygamesplits",
    playerClutchSplits:"playerdashboardbyclutch",
    playerShooting:"playerdashboardbyshootingsplits",
    playerTeamPerformance:"playerdashboardbyteamperformance",
    playerYearOverYear:"playerdashboardbyyearoveryear",
    playerCareer:"playercareerstats",
    playerGameLogs:"playergamelog",
    playerTrackingShots:"playerdashptshots",
    playerTrackingRebounds:"playerdashptreb",
    playerTrackingPasses:"playerdashptpass",
    playerTrackingDefense:"playerdashptshotdefend",
    playerTrackingLogShots:"playerdashptshotlog",
    playerTrackingLogRebounds:"playerdashptreboundlogs",
    playerVsPlayer:"playervsplayer",
    playersVsPlayers:"playersvsplayers",
    scoreboard:"scoreboard",
    scoreboard2:"scoreboardV2",
    shotchart:"shotchartdetail",
    teamList:"commonTeamYears",
    teamSummary:"teaminfocommon",
    teamCommonRoster:"commonteamroster",
    teamGeneralSplits:"teamdashboardbygeneralsplits",
    teamOpponentSplits:"teamdashboardbyopponent",
    teamLastNGamesSplits:"teamdashboardbylastngames",
    teamInGameSplits:"teamdashboardbygamesplits",
    teamClutchSplits:"teamdashboardbyclutch",
    teamShootingSplits:"teamdashboardbyshootingsplits",
    teamPerformanceSplits:"teamdashboardbyteamperformance",
    teamYearOverYearSplits:"teamdashboardbyyearoveryear",
    teamLineups:"teamdashlineups",
    teamPlayers:"teamplayerdashboard",
    teamPlayerOnOffDetails:"teamplayeronoffdetails",
    teamPlayerOnOffSummary:"teamplayeronoffsummary",
    teamGameLogs:"teamgamelog",
    teamSeason:"teamyearbyyearstats",
    teamTrackingDashShots:"teamdashptshots",
    teamTrackingDashRebounds:"teamdashptreb",
    teamTrackingDashPasses:"teamdashptpass",
    teamVsPlayer:"teamvsplayer",
    videoStatus:"videoStatus"
});
stats.constant("SEASON_CONFIG",{
    site:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    homepageLeaders:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    leadersCurrent:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00"
    },
    leadersAllTime:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1951-52",
        SeasonYearFrom:1951
    },
    leadersPre:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Pre Season",
        LeagueID:"00",
        SeasonFrom:"2007-08",
        SeasonYearFrom:2007
    },
    leagueLineups:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2007-08",
        SeasonYearFrom:2007
    },
    playerProfile:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00"
    },
    leaguePlayerStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    playerStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    playerVsPlayerStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2001-02",
        SeasonYearFrom:2001
    },
    earlyTeamProfile:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00"
    },
    earlyTeamStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00"
    },
    earlyTeamLineups:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2007-08",
        SeasonYearFrom:2007
    },
    teamRoster:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00"
    },
    teamProfile:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00"
    },
    leagueTeamStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    teamStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    teamLineups:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2007-08",
        SeasonYearFrom:2007
    },
    teamVsPlayerStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2001-02",
        SeasonYearFrom:2001
    },
    trackingStats:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2013-2014",
        SeasonYearFrom:2013
    },
    allstar:{
        Season:"2013-14",
        SeasonYear:2013,
        SeasonType:"All Star",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    leagueAllstar:{
        Season:"2013-14",
        SeasonYear:2013,
        SeasonType:"All Star",
        LeagueID:"00",
        SeasonFrom:"1996-97",
        SeasonYearFrom:1996
    },
    allstarRoster:{
        Season:"2013-14",
        SeasonYear:2013,
        SeasonType:"All Star",
        LeagueID:"00",
        SeasonFrom:"1950-51",
        SeasonYearFrom:1950
    },
    transactions:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2012-13",
        SeasonYearFrom:2012
    },
    DraftHistory:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"1946-47",
        SeasonYearFrom:1946
    },
    DraftCombineSummary:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2000-01",
        SeasonYearFrom:2e3
    },
    DraftCombineNonstationary:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2014-15",
        SeasonYearFrom:2014
    },
    DraftCombineSpotUp:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2014-15",
        SeasonYearFrom:2014
    },
    DraftCombineAgility:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2000-01",
        SeasonYearFrom:2e3
    },
    DraftCombineAnthro:{
        Season:"2014-15",
        SeasonYear:2014,
        SeasonType:"Regular Season",
        LeagueID:"00",
        SeasonFrom:"2000-01",
        SeasonYearFrom:2e3
    }
});
stats.constant("SPLITS_CONFIG",{
    Season:{
        name:"Season",
        label:"Season",
        "default":"2014-15",
        desc:"",
        type:"select",
        options:[{
            val:"2014-15",
            text:"2014-15"
        },{
            val:"2013-14",
            text:"2013-14"
        },{
            val:"2012-13",
            text:"2012-13"
        },{
            val:"2011-12",
            text:"2011-12"
        },{
            val:"2010-11",
            text:"2010-11"
        },{
            val:"2009-10",
            text:"2009-10"
        },{
            val:"2008-09",
            text:"2008-09"
        },{
            val:"2007-08",
            text:"2007-08"
        }]
        },
    SeasonType:{
        name:"SeasonType",
        label:"Season Type",
        "default":"Regular Season",
        type:"select",
        desc:"",
        options:[{
            val:"Preseason",
            text:"Preseason"
        },{
            val:"Regular Season",
            text:"Regular Season"
        },{
            val:"Playoffs",
            text:"Playoffs"
        }]
        },
    PerMode:{
        name:"PerMode",
        label:"Per Mode",
        "default":"PerGame",
        type:"select",
        desc:"",
        options:[{
            val:"Totals",
            text:"Totals"
        },{
            val:"PerGame",
            text:"Per Game"
        }]
        },
    StatCategory:{
        name:"StatCategory",
        label:"Stat Category",
        "default":"PTS",
        type:"select",
        desc:"",
        options:[{
            val:"MIN",
            text:"MIN"
        },{
            val:"FGM",
            text:"FGM"
        },{
            val:"FGA",
            text:"FGA"
        },{
            val:"FG_PCT",
            text:"FG%"
        },{
            val:"FG3M",
            text:"3PM"
        },{
            val:"FG3A",
            text:"3PA"
        },{
            val:"FG3_PCT",
            text:"3P%"
        },{
            val:"FTM",
            text:"FTM"
        },{
            val:"FTA",
            text:"FTA"
        },{
            val:"FT_PCT",
            text:"FT%"
        },{
            val:"OREB",
            text:"OREB"
        },{
            val:"DREB",
            text:"DREB"
        },{
            val:"REB",
            text:"REB"
        },{
            val:"AST",
            text:"AST"
        },{
            val:"STL",
            text:"STL"
        },{
            val:"BLK",
            text:"BLK"
        },{
            val:"TOV",
            text:"TOV"
        },{
            val:"EFF",
            text:"EFF"
        },{
            val:"PTS",
            text:"PTS"
        },{
            val:"AST_TOV",
            text:"AST/TO"
        },{
            val:"STL_TOV",
            text:"STL/TOV"
        },{
            val:"PF",
            text:"PF"
        }]
        },
    GameScope:{
        name:"Game Scope",
        label:"Game Scope",
        type:"select",
        description:"",
        "default":"",
        options:[{
            val:"",
            text:"Season"
        },{
            val:"Yesterday",
            text:"Yesterday"
        },{
            val:"Last10",
            text:"Last 10 Games"
        }]
        },
    GameSegment:{
        name:"GameSegment",
        label:"By Half",
        type:"select",
        description:"The option to view a player or team's stats in either the first half or the second half of a game.",
        "default":"",
        options:[{
            val:"",
            text:"Entire Game"
        },{
            val:"First Half",
            text:"First Half"
        },{
            val:"Second Half",
            text:"Second Half"
        },{
            val:"Overtime",
            text:"Overtime"
        }]
        },
    PaceAdjust:{
        name:"PaceAdjust",
        label:"Pace Adjust",
        "default":"N",
        type:"select",
        desc:"",
        options:[{
            val:"Y",
            text:"Pace Adjust On"
        },{
            val:"N",
            text:"Pace Adjust Off"
        }]
        },
    Period:{
        name:"Period",
        label:"Quarter",
        "default":"0",
        type:"select",
        desc:"",
        options:[{
            val:"0",
            text:"All Quarters"
        },{
            val:"1",
            text:"1st Quarter"
        },{
            val:"2",
            text:"2nd Quarter"
        },{
            val:"3",
            text:"3rd Quarter"
        },{
            val:"4",
            text:"4th Quarter"
        },{
            val:"5",
            text:"OT 1"
        },{
            val:"6",
            text:"OT 2"
        },{
            val:"7",
            text:"OT 3"
        },{
            val:"8",
            text:"OT 4"
        },{
            val:"9",
            text:"OT 5"
        },{
            val:"10",
            text:"OT 6"
        },{
            val:"11",
            text:"OT 7"
        },{
            val:"12",
            text:"OT 8"
        },{
            val:"13",
            text:"OT 9"
        },{
            val:"14",
            text:"OT 10"
        }]
        },
    PlusMinus:{
        name:"PlusMinus",
        label:"Differentials",
        "default":"N",
        type:"select",
        desc:"",
        options:[{
            val:"Y",
            text:"Differentials On"
        },{
            val:"N",
            text:"Differentials Off"
        }]
        },
    Rank:{
        name:"Rank",
        label:"Rank",
        "default":"N",
        type:"select",
        desc:"",
        options:[{
            val:"Y",
            text:"Rank On"
        },{
            val:"N",
            text:"Rank Off"
        }]
        },
    Scope:{
        name:"Scope",
        label:"Scope",
        "default":"S",
        type:"select",
        desc:"",
        options:[{
            val:"S",
            text:"All Players"
        },{
            val:"Rookies",
            text:"Rookies"
        }]
        },
    VsConference:{
        name:"VsConference",
        label:"VS Conference",
        "default":"",
        type:"select",
        desc:"",
        options:[{
            val:"",
            text:"All Conferences"
        },{
            val:"East",
            text:"East"
        },{
            val:"West",
            text:"West"
        }]
        },
    VsDivision:{
        name:"VsDivision",
        label:"VS Division",
        "default":"",
        type:"select",
        desc:"",
        options:[{
            val:"",
            text:"All Divisions"
        },{
            val:"Atlantic",
            text:"Atlantic"
        },{
            val:"Central",
            text:"Central"
        },{
            val:"Northwest",
            text:"Northwest"
        },{
            val:"Pacific",
            text:"Pacific"
        },{
            val:"Southeast",
            text:"Southeast"
        },{
            val:"Southwest",
            text:"Southwest"
        }]
        },
    Outcome:{
        name:"Outcome",
        label:"Outcome",
        "default":"",
        type:"select",
        desc:"",
        options:[{
            val:"",
            text:"All Outcomes"
        },{
            val:"W",
            text:"Wins"
        },{
            val:"L",
            text:"Losses"
        }]
        },
    Location:{
        name:"Location",
        label:"Location",
        "default":"",
        type:"select",
        desc:"",
        options:[{
            val:"",
            text:"All Locations"
        },{
            val:"Home",
            text:"Home"
        },{
            val:"Road",
            text:"Road"
        }]
        },
    SeasonSegment:{
        name:"SeasonSegment",
        label:"Season Segment",
        "default":"",
        type:"select",
        desc:"",
        options:[{
            val:"",
            text:"Entire Season"
        },{
            val:"Pre All-Star",
            text:"Pre All-Star"
        },{
            val:"Post All-Star",
            text:"Post All-Star"
        }]
        },
    LastNGames:{
        name:"LastNGames",
        label:"Last N Games",
        "default":"0",
        type:"select",
        desc:"",
        options:[{
            val:"0",
            text:"All Games"
        },{
            val:"1",
            text:"Last Game"
        },{
            val:"2",
            text:"Last 2 Games"
        },{
            val:"3",
            text:"Last 3 Games"
        },{
            val:"4",
            text:"Last 4 Games"
        },{
            val:"5",
            text:"Last 5 Games"
        },{
            val:"6",
            text:"Last 6 Games"
        },{
            val:"7",
            text:"Last 7 Games"
        },{
            val:"8",
            text:"Last 8 Games"
        },{
            val:"9",
            text:"Last 9 Games"
        },{
            val:"10",
            text:"Last 10 Games"
        },{
            val:"11",
            text:"Last 11 Games"
        },{
            val:"12",
            text:"Last 12 Games"
        },{
            val:"13",
            text:"Last 13 Games"
        },{
            val:"14",
            text:"Last 14 Games"
        },{
            val:"15",
            text:"Last 15 Games"
        }]
        },
    OpponentTeamID:{
        name:"OpponentTeamID",
        label:"VS Opponent",
        "default":"0",
        type:"select",
        desc:"",
        options:[{
            val:"0",
            text:"Vs All Teams"
        },{
            val:"1610612737",
            text:"Atlanta Hawks"
        },{
            val:"1610612738",
            text:"Boston Celtics"
        },{
            val:"1610612751",
            text:"Brooklyn Nets"
        },{
            val:"1610612766",
            text:"Charlotte Hornets"
        },{
            val:"1610612741",
            text:"Chicago Bulls"
        },{
            val:"1610612739",
            text:"Cleveland Cavaliers"
        },{
            val:"1610612742",
            text:"Dallas Mavericks"
        },{
            val:"1610612743",
            text:"Denver Nuggets"
        },{
            val:"1610612765",
            text:"Detroit Pistons"
        },{
            val:"1610612744",
            text:"Golden State Warriors"
        },{
            val:"1610612745",
            text:"Houston Rockets"
        },{
            val:"1610612754",
            text:"Indiana Pacers"
        },{
            val:"1610612746",
            text:"Los Angeles Clippers"
        },{
            val:"1610612747",
            text:"Los Angeles Lakers"
        },{
            val:"1610612763",
            text:"Memphis Grizzlies"
        },{
            val:"1610612748",
            text:"Miami Heat"
        },{
            val:"1610612749",
            text:"Milwaukee Bucks"
        },{
            val:"1610612750",
            text:"Minnesota Timberwolves"
        },{
            val:"1610612740",
            text:"New Orleans Pelicans"
        },{
            val:"1610612752",
            text:"New York Knicks"
        },{
            val:"1610612760",
            text:"Oklahoma City Thunder"
        },{
            val:"1610612753",
            text:"Orlando Magic"
        },{
            val:"1610612755",
            text:"Philadelphia 76ers"
        },{
            val:"1610612756",
            text:"Phoenix Suns"
        },{
            val:"1610612757",
            text:"Portland Trail Blazers"
        },{
            val:"1610612758",
            text:"Sacramento Kings"
        },{
            val:"1610612759",
            text:"San Antonio Spurs"
        },{
            val:"1610612761",
            text:"Toronto Raptors"
        },{
            val:"1610612762",
            text:"Utah Jazz"
        },{
            val:"1610612764",
            text:"Washington Wizards"
        }]
        },
    Month:{
        name:"Month",
        label:"Month",
        "default":"0",
        type:"select",
        desc:"",
        options:[{
            val:"0",
            text:"All Months"
        },{
            val:"4",
            text:"January"
        },{
            val:"5",
            text:"February"
        },{
            val:"6",
            text:"March"
        },{
            val:"7",
            text:"April"
        },{
            val:"8",
            text:"May"
        },{
            val:"9",
            text:"June"
        },{
            val:"10",
            text:"July"
        },{
            val:"11",
            text:"August"
        },{
            val:"12",
            text:"September"
        },{
            val:"1",
            text:"October"
        },{
            val:"2",
            text:"November"
        },{
            val:"3",
            text:"December"
        }]
        },
    PlayerPosition:{
        name:"PlayerPosition",
        label:"Position",
        "default":"",
        type:"select",
        desc:"Filter out players by position to view either only Guards, Forwards, or Centers.",
        options:[{
            val:"",
            text:"All Positions"
        },{
            val:"F",
            text:"Forward"
        },{
            val:"C",
            text:"Center"
        },{
            val:"G",
            text:"Guard"
        }]
        },
    StarterBench:{
        name:"StarterBench",
        label:"Starter Bench",
        "default":"",
        type:"select",
        description:"The option to view stats by either the starters or the bench of a team.",
        options:[{
            val:"",
            text:"All Players"
        },{
            val:"Starters",
            text:"Starters"
        },{
            val:"Bench",
            text:"Bench"
        }]
        },
    PlayerExperience:{
        name:"PlayerExperience",
        label:"Experience",
        "default":"",
        type:"select",
        description:"The option to view either only rookies, or to exclude rookies from the data set.",
        options:[{
            val:"",
            text:"All Experience"
        },{
            val:"Rookie",
            text:"Rookie"
        },{
            val:"Sophomore",
            text:"Sophomore"
        },{
            val:"Veteran",
            text:"Veteran"
        }]
        },
    GroupQuantity:{
        name:"GroupQuantity",
        label:"Line Ups",
        "default":"5",
        type:"select",
        description:"",
        options:[{
            val:"5",
            text:"5 Man Lineups"
        },{
            val:"4",
            text:"4 Man Lineups"
        },{
            val:"3",
            text:"3 Man Lineups"
        },{
            val:"2",
            text:"2 Man Lineups"
        }]
        },
    ClutchTime:{
        name:"ClutchTime",
        label:"Clutch Time",
        "default":"Last 5 Minutes",
        type:"select",
        description:"",
        options:[{
            val:"Last 5 Minutes",
            text:"Last 5 Minutes"
        },{
            val:"Last 4 Minutes",
            text:"Last 4 Minutes"
        },{
            val:"Last 3 Minutes",
            text:"Last 3 Minutes"
        },{
            val:"Last 2 Minutes",
            text:"Last 2 Minutes"
        },{
            val:"Last 1 Minute",
            text:"Last 1 Minute"
        },{
            val:"Last 30 Seconds",
            text:"Last 30 Seconds"
        },{
            val:"Last 10 Seconds",
            text:"Last 10 Seconds"
        }]
        },
    AheadBehind:{
        name:"AheadBehind",
        label:"Ahead or Behind",
        "default":"Ahead or Behind",
        type:"select",
        description:"",
        options:[{
            val:"Ahead or Behind",
            text:"Ahead or Behind"
        },{
            val:"Behind or Tied",
            text:"Behind or Tied"
        },{
            val:"Ahead or Tied",
            text:"Ahead or Tied"
        }]
        },
    PointDiff:{
        name:"PointDiff",
        label:"PointDiff",
        "default":"5",
        type:"select",
        description:"",
        options:[{
            val:"5",
            text:"5 Point Diff or Less"
        },{
            val:"4",
            text:"4 Point Diff or Less"
        },{
            val:"3",
            text:"3 Point Diff or Less"
        },{
            val:"2",
            text:"2 Point Diff or Less"
        },{
            val:"1",
            text:"1 Point Diff"
        }]
        },
    DistanceRange:{
        name:"DistanceRange",
        label:"Distance Range",
        "default":"5ft Range",
        type:"select",
        description:"",
        options:[{
            val:"5ft Range",
            text:"5ft Range"
        },{
            val:"8ft Range",
            text:"8ft Range"
        },{
            val:"By Zone",
            text:"By Zone"
        }]
        },
    DateFrom:{
        name:"DateFrom",
        label:"Date From",
        "default":"",
        type:"datepicker",
        description:"",
        selected:{
            val:""
        }
    },
DateTo:{
    name:"DateTo",
    label:"Date To",
    "default":"",
    type:"datepicker",
    description:"",
    selected:{
        val:""
    }
}
});
stats.constant("TEAMS",[{
    abbr:"ATL",
    city:"Atlanta",
    code:"hawks",
    conference:"Eastern",
    displayAbbr:"ATL",
    displayConference:"Eastern",
    division:"Southeast",
    id:"1610612737",
    name:"Hawks"
},{
    abbr:"BOS",
    city:"Boston",
    code:"celtics",
    conference:"Eastern",
    displayAbbr:"BOS",
    displayConference:"Eastern",
    division:"Atlantic",
    id:"1610612738",
    name:"Celtics"
},{
    abbr:"BKN",
    city:"Brooklyn",
    code:"nets",
    conference:"Eastern",
    displayAbbr:"BKN",
    displayConference:"Eastern",
    division:"Atlantic",
    id:"1610612751",
    name:"Nets"
},{
    abbr:"CHA",
    city:"Charlotte",
    code:"hornets",
    conference:"Eastern",
    displayAbbr:"CHA",
    displayConference:"Eastern",
    division:"Southeast",
    id:"1610612766",
    name:"Hornets"
},{
    abbr:"CHI",
    city:"Chicago",
    code:"bulls",
    conference:"Eastern",
    displayAbbr:"CHI",
    displayConference:"Eastern",
    division:"Central",
    id:"1610612741",
    name:"Bulls"
},{
    abbr:"CLE",
    city:"Cleveland",
    code:"cavaliers",
    conference:"Eastern",
    displayAbbr:"CLE",
    displayConference:"Eastern",
    division:"Central",
    id:"1610612739",
    name:"Cavaliers"
},{
    abbr:"DET",
    city:"Detroit",
    code:"pistons",
    conference:"Eastern",
    displayAbbr:"DET",
    displayConference:"Eastern",
    division:"Central",
    id:"1610612765",
    name:"Pistons"
},{
    abbr:"IND",
    city:"Indiana",
    code:"pacers",
    conference:"Eastern",
    displayAbbr:"IND",
    displayConference:"Eastern",
    division:"Central",
    id:"1610612754",
    name:"Pacers"
},{
    abbr:"MIA",
    city:"Miami",
    code:"heat",
    conference:"Eastern",
    displayAbbr:"MIA",
    displayConference:"Eastern",
    division:"Southeast",
    id:"1610612748",
    name:"Heat"
},{
    abbr:"MIL",
    city:"Milwaukee",
    code:"bucks",
    conference:"Eastern",
    displayAbbr:"MIL",
    displayConference:"Eastern",
    division:"Central",
    id:"1610612749",
    name:"Bucks"
},{
    abbr:"NYK",
    city:"New York",
    code:"knicks",
    conference:"Eastern",
    displayAbbr:"NYK",
    displayConference:"Eastern",
    division:"Atlantic",
    id:"1610612752",
    name:"Knicks"
},{
    abbr:"ORL",
    city:"Orlando",
    code:"magic",
    conference:"Eastern",
    displayAbbr:"ORL",
    displayConference:"Eastern",
    division:"Southeast",
    id:"1610612753",
    name:"Magic"
},{
    abbr:"PHI",
    city:"Philadelphia",
    code:"sixers",
    conference:"Eastern",
    displayAbbr:"PHI",
    displayConference:"Eastern",
    division:"Atlantic",
    id:"1610612755",
    name:"Sixers"
},{
    abbr:"TOR",
    city:"Toronto",
    code:"raptors",
    conference:"Eastern",
    displayAbbr:"TOR",
    displayConference:"Eastern",
    division:"Atlantic",
    id:"1610612761",
    name:"Raptors"
},{
    abbr:"WAS",
    city:"Washington",
    code:"wizards",
    conference:"Eastern",
    displayAbbr:"WAS",
    displayConference:"Eastern",
    division:"Southeast",
    id:"1610612764",
    name:"Wizards"
},{
    abbr:"DAL",
    city:"Dallas",
    code:"mavericks",
    conference:"Western",
    displayAbbr:"DAL",
    displayConference:"Western",
    division:"Southwest",
    id:"1610612742",
    name:"Mavericks"
},{
    abbr:"DEN",
    city:"Denver",
    code:"nuggets",
    conference:"Western",
    displayAbbr:"DEN",
    displayConference:"Western",
    division:"Northwest",
    id:"1610612743",
    name:"Nuggets"
},{
    abbr:"GSW",
    city:"Golden State",
    code:"warriors",
    conference:"Western",
    displayAbbr:"GSW",
    displayConference:"Western",
    division:"Pacific",
    id:"1610612744",
    name:"Warriors"
},{
    abbr:"HOU",
    city:"Houston",
    code:"rockets",
    conference:"Western",
    displayAbbr:"HOU",
    displayConference:"Western",
    division:"Southwest",
    id:"1610612745",
    name:"Rockets"
},{
    abbr:"LAC",
    city:"Los Angeles",
    code:"clippers",
    conference:"Western",
    displayAbbr:"LAC",
    displayConference:"Western",
    division:"Pacific",
    id:"1610612746",
    name:"Clippers"
},{
    abbr:"LAL",
    city:"Los Angeles",
    code:"lakers",
    conference:"Western",
    displayAbbr:"LAL",
    displayConference:"Western",
    division:"Pacific",
    id:"1610612747",
    name:"Lakers"
},{
    abbr:"MEM",
    city:"Memphis",
    code:"grizzlies",
    conference:"Western",
    displayAbbr:"MEM",
    displayConference:"Western",
    division:"Southwest",
    id:"1610612763",
    name:"Grizzlies"
},{
    abbr:"MIN",
    city:"Minnesota",
    code:"timberwolves",
    conference:"Western",
    displayAbbr:"MIN",
    displayConference:"Western",
    division:"Northwest",
    id:"1610612750",
    name:"Timberwolves"
},{
    abbr:"NOP",
    city:"New Orleans",
    code:"pelicans",
    conference:"Western",
    displayAbbr:"NOP",
    displayConference:"Western",
    division:"Southwest",
    id:"1610612740",
    name:"Pelicans"
},{
    abbr:"OKC",
    city:"Oklahoma City",
    code:"thunder",
    conference:"Western",
    displayAbbr:"OKC",
    displayConference:"Western",
    division:"Northwest",
    id:"1610612760",
    name:"Thunder"
},{
    abbr:"PHX",
    city:"Phoenix",
    code:"suns",
    conference:"Western",
    displayAbbr:"PHX",
    displayConference:"Western",
    division:"Pacific",
    id:"1610612756",
    name:"Suns"
},{
    abbr:"POR",
    city:"Portland",
    code:"blazers",
    conference:"Western",
    displayAbbr:"POR",
    displayConference:"Western",
    division:"Northwest",
    id:"1610612757",
    name:"Trail Blazers"
},{
    abbr:"SAC",
    city:"Sacramento",
    code:"kings",
    conference:"Western",
    displayAbbr:"SAC",
    displayConference:"Western",
    division:"Pacific",
    id:"1610612758",
    name:"Kings"
},{
    abbr:"SAS",
    city:"San Antonio",
    code:"spurs",
    conference:"Western",
    displayAbbr:"SAS",
    displayConference:"Western",
    division:"Southwest",
    id:"1610612759",
    name:"Spurs"
},{
    abbr:"UTA",
    city:"Utah",
    code:"jazz",
    conference:"Western",
    displayAbbr:"UTA",
    displayConference:"Western",
    division:"Northwest",
    id:"1610612762",
    name:"Jazz"
}]);
stats.config(["$locationProvider","$routeProvider",function($locationProvider,$routeProvider){
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
    switch(window.location.pathname){
        case"/game/":
            $routeProvider.when("/:GameID/",{
            templateUrl:"/templates/game/boxscore.html",
            reloadOnSearch:false,
            section:"stats",
            page:"boxscore"
        }).when("/:GameID/advanced/",{
            templateUrl:"/templates/game/advanced.html",
            reloadOnSearch:false,
            section:"stats",
            page:"advanced"
        }).when("/:GameID/fourfactors/",{
            templateUrl:"/templates/game/fourfactors.html",
            reloadOnSearch:false,
            section:"stats",
            page:"fourfactors"
        }).when("/:GameID/misc/",{
            templateUrl:"/templates/game/misc.html",
            reloadOnSearch:false,
            section:"stats",
            page:"misc"
        }).when("/:GameID/scoring/",{
            templateUrl:"/templates/game/scoring.html",
            reloadOnSearch:false,
            section:"stats",
            page:"scoring"
        }).when("/:GameID/usage/",{
            templateUrl:"/templates/game/usage.html",
            reloadOnSearch:false,
            section:"stats",
            page:"usage"
        }).when("/:GameID/playbyplay/",{
            templateUrl:"/templates/game/playbyplay.html",
            reloadOnSearch:false,
            section:"playbyplay",
            page:"playbyplay"
        }).when("/:GameID/playertracking/",{
            templateUrl:"/templates/game/playertracking.html",
            reloadOnSearch:false,
            section:"playertracking",
            page:"playertracking"
        });
        break;
        case"/team/":
            $routeProvider.when("/:TeamID/",{
            templateUrl:"/templates/team/profile.html",
            page:"profile",
            reloadOnSearch:false
        }).when("/:TeamID/stats/",{
            templateUrl:"/templates/team/statsTraditional.html",
            page:"statsTraditional",
            reloadOnSearch:false
        }).when("/:TeamID/stats/advanced/",{
            templateUrl:"/templates/team/statsAdvanced.html",
            page:"statsAdvanced",
            reloadOnSearch:false
        }).when("/:TeamID/stats/fourfactors/",{
            templateUrl:"/templates/team/statsFourFactors.html",
            page:"statsFourFactors",
            reloadOnSearch:false
        }).when("/:TeamID/stats/misc/",{
            templateUrl:"/templates/team/statsMisc.html",
            page:"statsMisc",
            reloadOnSearch:false
        }).when("/:TeamID/stats/scoring/",{
            templateUrl:"/templates/team/statsScoring.html",
            page:"statsScoring",
            reloadOnSearch:false
        }).when("/:TeamID/stats/opponent/",{
            templateUrl:"/templates/team/statsOpponent.html",
            page:"statsOpponent",
            reloadOnSearch:false
        }).when("/:TeamID/stats/shooting/",{
            templateUrl:"/templates/team/statsShooting.html",
            page:"statsShooting",
            reloadOnSearch:false
        }).when("/:TeamID/lineups/",{
            templateUrl:"/templates/team/lineupsTraditional.html",
            page:"lineupsTraditional",
            reloadOnSearch:false
        }).when("/:TeamID/lineups/advanced/",{
            templateUrl:"/templates/team/lineupsAdvanced.html",
            page:"lineupsAdvanced",
            reloadOnSearch:false
        }).when("/:TeamID/lineups/fourfactors/",{
            templateUrl:"/templates/team/lineupsFourFactors.html",
            page:"lineupsFourFactors",
            reloadOnSearch:false
        }).when("/:TeamID/lineups/misc/",{
            templateUrl:"/templates/team/lineupsMisc.html",
            page:"lineupsMisc",
            reloadOnSearch:false
        }).when("/:TeamID/lineups/scoring/",{
            templateUrl:"/templates/team/lineupsScoring.html",
            page:"lineupsScoring",
            reloadOnSearch:false
        }).when("/:TeamID/lineups/opponent/",{
            templateUrl:"/templates/team/lineupsOpponent.html",
            page:"lineupsOpponent",
            reloadOnSearch:false
        }).when("/:TeamID/players/",{
            templateUrl:"/templates/team/playersTraditional.html",
            page:"playersTraditional",
            reloadOnSearch:false
        }).when("/:TeamID/players/advanced/",{
            templateUrl:"/templates/team/playersAdvanced.html",
            page:"playersAdvanced",
            reloadOnSearch:false
        }).when("/:TeamID/players/misc/",{
            templateUrl:"/templates/team/playersMisc.html",
            page:"playersMisc",
            reloadOnSearch:false
        }).when("/:TeamID/players/scoring/",{
            templateUrl:"/templates/team/playersScoring.html",
            page:"playersScoring",
            reloadOnSearch:false
        }).when("/:TeamID/players/usage/",{
            templateUrl:"/templates/team/playersUsage.html",
            page:"playersUsage",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/",{
            templateUrl:"/templates/team/onoffcourtTraditional.html",
            page:"onoffcourtTraditional",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/advanced/",{
            templateUrl:"/templates/team/onoffcourtAdvanced.html",
            page:"onoffcourtAdvanced",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/fourfactors/",{
            templateUrl:"/templates/team/onoffcourtFourFactors.html",
            page:"onoffcourtFourFactors",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/misc/",{
            templateUrl:"/templates/team/onoffcourtMisc.html",
            page:"onoffcourtMisc",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/scoring/",{
            templateUrl:"/templates/team/onoffcourtScoring.html",
            page:"onoffcourtScoring",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/opponent/",{
            templateUrl:"/templates/team/onoffcourtOpponent.html",
            page:"onoffcourtOpponent",
            reloadOnSearch:false
        }).when("/:TeamID/onoffcourt/summary/",{
            templateUrl:"/templates/team/onoffcourtSummary.html",
            page:"onoffcourtSummary",
            reloadOnSearch:false
        }).when("/:TeamID/gamelogs/",{
            templateUrl:"/templates/team/gamelogs.html",
            page:"gamelogs",
            reloadOnSearch:false
        }).when("/:TeamID/seasons/",{
            templateUrl:"/templates/team/seasons.html",
            page:"seasons",
            reloadOnSearch:false
        }).when("/:TeamID/yearoveryear/",{
            templateUrl:"/templates/team/yearoveryear.html",
            page:"yearoveryear",
            reloadOnSearch:false
        }).when("/:TeamID/tracking/shots/",{
            templateUrl:"/templates/team/trackingDashShots.html",
            page:"trackingdashshots",
            reloadOnSearch:false
        }).when("/:TeamID/tracking/rebounds/",{
            templateUrl:"/templates/team/trackingDashRebounds.html",
            page:"trackingdashrebounds",
            reloadOnSearch:false
        }).when("/:TeamID/tracking/passes/",{
            templateUrl:"/templates/team/trackingDashPasses.html",
            page:"trackingdashpasses",
            reloadOnSearch:false
        });
        break;
        case"/player/":
            $routeProvider.when("/:PlayerID/video/",{
            templateUrl:"/templates/player/video.html",
            page:"video",
            reloadOnSearch:false
        }).when("/:PlayerID/",{
            templateUrl:"/templates/player/profile.html",
            page:"profile",
            reloadOnSearch:false
        }).when("/:PlayerID/career/",{
            templateUrl:"/templates/player/career.html",
            page:"career",
            reloadOnSearch:false
        }).when("/:PlayerID/vs/",{
            templateUrl:"/templates/player/vsPlayerBase.html",
            page:"compare",
            reloadOnSearch:false
        }).when("/:PlayerID/vs/:VsPlayer/:MultiPlayer",{
            templateUrl:"/templates/player/vsPlayerBase.html",
            page:"compare",
            reloadOnSearch:false
        }).when("/:PlayerID/gamelogs/",{
            templateUrl:"/templates/player/gamelogs.html",
            page:"gamelogs",
            reloadOnSearch:false
        }).when("/:PlayerID/tracking/shotslogs/",{
            templateUrl:"/templates/player/trackingLogsShots.html",
            page:"trackinglogsshots",
            reloadOnSearch:false
        }).when("/:PlayerID/tracking/reboundslogs/",{
            templateUrl:"/templates/player/trackingLogsRebounds.html",
            page:"trackinglogsrebounds",
            reloadOnSearch:false
        }).when("/:PlayerID/stats/",{
            templateUrl:"/templates/player/statsTraditional.html",
            page:"statsTraditional",
            reloadOnSearch:false
        }).when("/:PlayerID/stats/advanced/",{
            templateUrl:"/templates/player/statsAdvanced.html",
            page:"statsAdvanced",
            reloadOnSearch:false
        }).when("/:PlayerID/stats/misc/",{
            templateUrl:"/templates/player/statsMisc.html",
            page:"statsMisc",
            reloadOnSearch:false
        }).when("/:PlayerID/stats/scoring/",{
            templateUrl:"/templates/player/statsScoring.html",
            page:"statsScoring",
            reloadOnSearch:false
        }).when("/:PlayerID/stats/shooting/",{
            templateUrl:"/templates/player/statsShooting.html",
            page:"statsShooting",
            reloadOnSearch:false
        }).when("/:PlayerID/stats/usage/",{
            templateUrl:"/templates/player/statsUsage.html",
            page:"statsUsage",
            reloadOnSearch:false
        }).when("/:PlayerID/tracking/shots/",{
            templateUrl:"/templates/player/trackingShots.html",
            page:"trackingShots",
            reloadOnSearch:false
        }).when("/:PlayerID/tracking/rebounds/",{
            templateUrl:"/templates/player/trackingRebounds.html",
            page:"trackingRebounds",
            reloadOnSearch:false
        }).when("/:PlayerID/tracking/passes/",{
            templateUrl:"/templates/player/trackingPasses.html",
            page:"trackingPasses",
            reloadOnSearch:false
        }).when("/:PlayerID/tracking/defense/",{
            templateUrl:"/templates/player/trackingDefense.html",
            page:"trackingDefense",
            reloadOnSearch:false
        });
        break;
        case"/league/team/":
            $routeProvider.when("/",{
            templateUrl:"/templates/league/team/generalTraditional.html",
            page:"generalTraditional",
            reloadOnSearch:false
        }).when("/advanced/",{
            templateUrl:"/templates/league/team/generalAdvanced.html",
            page:"generalAdvanced",
            reloadOnSearch:false
        }).when("/fourfactors/",{
            templateUrl:"/templates/league/team/generalFourFactors.html",
            page:"generalFourFactors",
            reloadOnSearch:false
        }).when("/misc/",{
            templateUrl:"/templates/league/team/generalMisc.html",
            page:"generalMisc",
            reloadOnSearch:false
        }).when("/scoring/",{
            templateUrl:"/templates/league/team/generalScoring.html",
            page:"generalScoring",
            reloadOnSearch:false
        }).when("/opponent/",{
            templateUrl:"/templates/league/team/generalOpponent.html",
            page:"generalOpponent",
            reloadOnSearch:false
        }).when("/clutch/",{
            templateUrl:"/templates/league/team/clutchTraditional.html",
            page:"clutchTraditional",
            reloadOnSearch:false
        }).when("/clutch/advanced/",{
            templateUrl:"/templates/league/team/clutchAdvanced.html",
            page:"clutchAdvanced",
            reloadOnSearch:false
        }).when("/clutch/fourfactors/",{
            templateUrl:"/templates/league/team/clutchFourFactors.html",
            page:"clutchFourFactors",
            reloadOnSearch:false
        }).when("/clutch/misc/",{
            templateUrl:"/templates/league/team/clutchMisc.html",
            page:"clutchMisc",
            reloadOnSearch:false
        }).when("/clutch/scoring/",{
            templateUrl:"/templates/league/team/clutchScoring.html",
            page:"clutchScoring",
            reloadOnSearch:false
        }).when("/clutch/opponent/",{
            templateUrl:"/templates/league/team/clutchOpponent.html",
            page:"clutchOpponent",
            reloadOnSearch:false
        }).when("/shooting/",{
            templateUrl:"/templates/league/team/shooting.html",
            page:"shooting",
            reloadOnSearch:false
        }).when("/oppshooting/",{
            templateUrl:"/templates/league/team/oppShooting.html",
            page:"oppshooting",
            reloadOnSearch:false
        });
        break;
        case"/league/player/":
            $routeProvider.when("/",{
            templateUrl:"/templates/league/player/generalTraditional.html",
            page:"generalTraditional",
            reloadOnSearch:false
        }).when("/advanced/",{
            templateUrl:"/templates/league/player/generalAdvanced.html",
            page:"generalAdvanced",
            reloadOnSearch:false
        }).when("/misc/",{
            templateUrl:"/templates/league/player/generalMisc.html",
            page:"generalMisc",
            reloadOnSearch:false
        }).when("/scoring/",{
            templateUrl:"/templates/league/player/generalScoring.html",
            page:"generalScoring",
            reloadOnSearch:false
        }).when("/usage/",{
            templateUrl:"/templates/league/player/generalUsage.html",
            page:"generalUsage",
            reloadOnSearch:false
        }).when("/clutch/",{
            templateUrl:"/templates/league/player/clutchTraditional.html",
            page:"clutchTraditional",
            reloadOnSearch:false
        }).when("/clutch/advanced/",{
            templateUrl:"/templates/league/player/clutchAdvanced.html",
            page:"clutchAdvanced",
            reloadOnSearch:false
        }).when("/clutch/misc/",{
            templateUrl:"/templates/league/player/clutchMisc.html",
            page:"clutchMisc",
            reloadOnSearch:false
        }).when("/clutch/scoring/",{
            templateUrl:"/templates/league/player/clutchScoring.html",
            page:"clutchScoring",
            reloadOnSearch:false
        }).when("/clutch/usage/",{
            templateUrl:"/templates/league/player/clutchUsage.html",
            page:"clutchUsage",
            reloadOnSearch:false
        }).when("/shooting/",{
            templateUrl:"/templates/league/player/shooting.html",
            page:"shooting",
            reloadOnSearch:false
        }).when("/oppshooting/",{
            templateUrl:"/templates/league/player/oppShooting.html",
            page:"oppshooting",
            reloadOnSearch:false
        });
        break;
        case"/league/lineups/":
            $routeProvider.when("/",{
            templateUrl:"/templates/league/lineups/traditional.html",
            page:"traditional",
            reloadOnSearch:false
        }).when("/advanced/",{
            templateUrl:"/templates/league/lineups/advanced.html",
            page:"advanced",
            reloadOnSearch:false
        }).when("/fourfactors/",{
            templateUrl:"/templates/league/lineups/fourfactors.html",
            page:"fourfactors",
            reloadOnSearch:false
        }).when("/misc/",{
            templateUrl:"/templates/league/lineups/misc.html",
            page:"misc",
            reloadOnSearch:false
        }).when("/scoring/",{
            templateUrl:"/templates/league/lineups/scoring.html",
            page:"scoring",
            reloadOnSearch:false
        }).when("/opponent/",{
            templateUrl:"/templates/league/lineups/opponent.html",
            page:"opponent",
            reloadOnSearch:false
        });
        break;
        case"/draftcombine/":
            $routeProvider.when("/",{
            templateUrl:"/templates/draftcombine/summary.html",
            page:"summary",
            reloadOnSearch:false
        }).when("/spotup/",{
            templateUrl:"/templates/draftcombine/spotup.html",
            page:"spotup",
            reloadOnSearch:false
        }).when("/nonstationary/",{
            templateUrl:"/templates/draftcombine/nonstationary.html",
            page:"nonstationary",
            reloadOnSearch:false
        }).when("/agility/",{
            templateUrl:"/templates/draftcombine/agility.html",
            page:"agility",
            reloadOnSearch:false
        }).when("/anthro/",{
            templateUrl:"/templates/draftcombine/anthro.html",
            page:"summary",
            reloadOnSearch:false
        });
        break;
        case"/tracking/":
            $routeProvider.when("/:Section/",{
            templateUrl:"/templates/tracking/summary.html",
            page:"summary",
            reloadOnSearch:false
        }).when("/:Section/catchshoot/",{
            templateUrl:"/templates/tracking/catchshoot.html",
            page:"catchshoot",
            reloadOnSearch:false
        }).when("/:Section/defense/",{
            templateUrl:"/templates/tracking/defense.html",
            page:"defense",
            reloadOnSearch:false
        }).when("/:Section/drives/",{
            templateUrl:"/templates/tracking/drives.html",
            page:"drives",
            reloadOnSearch:false
        }).when("/:Section/passing/",{
            templateUrl:"/templates/tracking/passing.html",
            page:"passing",
            reloadOnSearch:false
        }).when("/:Section/possessions/",{
            templateUrl:"/templates/tracking/possessions.html",
            page:"possessions",
            reloadOnSearch:false
        }).when("/:Section/pullup/",{
            templateUrl:"/templates/tracking/pullup.html",
            page:"pullup",
            reloadOnSearch:false
        }).when("/:Section/rebounding/",{
            templateUrl:"/templates/tracking/rebounding.html",
            page:"rebounding",
            reloadOnSearch:false
        }).when("/:Section/shooting/",{
            templateUrl:"/templates/tracking/shooting.html",
            page:"shooting",
            reloadOnSearch:false
        }).when("/:Section/speed/",{
            templateUrl:"/templates/tracking/speed.html",
            page:"speed",
            reloadOnSearch:false
        });
        break;
        case"/playlist/":
            $routeProvider.when("/cvp/",{
            templateUrl:"/templates/overlay/cvp.html",
            page:"cvp",
            reloadOnSearch:false
        }).when("/movement/",{
            templateUrl:"/templates/overlay/movement.html",
            page:"movement",
            reloadOnSearch:false
        });
        break;
        case"/vs/":
            $routeProvider.when("/",{
            templateUrl:"/templates/vs/vsPlayerBase.html",
            page:"pvp",
            reloadOnSearch:false
        }).when("/advanced",{
            templateUrl:"/templates/vs/vsPlayerAdvanced.html",
            page:"advanced",
            reloadOnSearch:false
        }).when("/misc",{
            templateUrl:"/templates/vs/vsPlayerMisc.html",
            page:"misc",
            reloadOnSearch:false
        }).when("/scoring",{
            templateUrl:"/templates/vs/vsPlayerScoring.html",
            page:"scoring",
            reloadOnSearch:false
        }).when("/fourfactors",{
            templateUrl:"/templates/vs/vsTeamFourFactors.html",
            page:"shooting",
            reloadOnSearch:false
        }).when("/opponent",{
            templateUrl:"/templates/vs/vsTeamOpponent.html",
            page:"shooting",
            reloadOnSearch:false
        });
        break
        }
        }]);
stats.service("DraftCombineAgilityService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("draftCombineAgility","",params).then(function(){
            var datasets=StatsRequest.getResults();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("DraftCombineAnthroService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("draftCombineAnthro","",params).then(function(){
            var datasets=StatsRequest.getResults();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("DraftCombineNonStationaryService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("draftCombineNonstationary","",params).then(function(){
            var datasets=StatsRequest.getResults();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("DraftCombineSpotUpService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("draftCombineSpotup","",params).then(function(){
            var datasets=StatsRequest.getResults();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("boxscoreAdvancedService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.TeamStats.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.PlayerStats.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreAdvanced_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscoreFourFactorsService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.sqlTeamsFourFactors.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.sqlPlayersFourFactors.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreFourFactors_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscoreMiscService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.sqlTeamsMisc.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.sqlPlayersMisc.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreMisc_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscorePlayByPlayService",["$q","StatsRequest",function($q,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("boxscorePlayByPlay_2","",params).then(function(){
            var data=StatsRequest.getData();
            var plays=data.PlayByPlay.datatable;
            deferred.resolve(plays)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("boxscorePlayerTrackingService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.PlayerTrackTeam.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.PlayerTrack.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NICKNAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscorePlayerTracker_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscoreScoringService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.sqlTeamsScoring.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.sqlPlayersScoring.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreScoring_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscoreSummaryService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data){
        var boxscore={
            teams:{}
    };

    boxscore.summary=data.GameSummary.datatable[0];
    boxscore.gameInfo=data.GameInfo.datatable[0];
    boxscore.officials=data.Officials.datatable;
    boxscore.seasontype=$filter("seasontype")(boxscore.summary.GAME_ID);
    boxscore.season=$filter("seasonyear")(parseInt(boxscore.summary.SEASON,10));
    boxscore.av={
        hasVideo:data.AvailableVideo.datatable[0].VIDEO_AVAILABLE_FLAG===1,
        hasXYZ:data.AvailableVideo.datatable[0].PT_XYZ_AVAILABLE===1,
        hasTracking:data.AvailableVideo.datatable[0].PT_AVAILABLE===1
        };

    boxscore.teams.vtm=$filter("filter")(data.LineScore.datatable,{
        TEAM_ID:boxscore.summary.VISITOR_TEAM_ID
        })[0];
    boxscore.teams.htm=$filter("filter")(data.LineScore.datatable,{
        TEAM_ID:boxscore.summary.HOME_TEAM_ID
        })[0];
    boxscore.otherStats={
        vtm:data.OtherStats.datatable[0],
        htm:data.OtherStats.datatable[1]
        };

    return boxscore
    };

function get(params){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreSummary","",params).then(function(){
        var data=StatsRequest.getData();
        var boxscore=parse(data);
        deferred.resolve(boxscore)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscoreTraditionalService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.TeamStats.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.PlayerStats.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreTraditional_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("boxscoreUsageService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data,htmid,vtmid){
        var linescores={
            htm:{},
            vtm:{}
    };

    linescores.vtm.teamid=vtmid;
    linescores.htm.teamid=htmid;
    for(var i in linescores){
        var team=linescores[i];
        team.datafooter=$filter("filter")(data.sqlTeamsUsage.datatable,{
            TEAM_ID:team.teamid
            });
        team.datatable=$filter("filter")(data.sqlPlayersUsage.datatable,{
            TEAM_ID:team.teamid
            });
        team.title=team.datafooter[0].TEAM_CITY+" "+team.datafooter[0].TEAM_NAME
        }
        return linescores
    };

function get(params,htmid,vtmid){
    var deferred=$q.defer();
    StatsRequest.get("boxscoreUsage_2","",params).then(function(){
        var data=StatsRequest.getData();
        var linescores=parse(data,htmid,vtmid);
        deferred.resolve(linescores)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("FranchiseHistoryService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function parse(data){
        for(var i in data.FranchiseHistory.datatable){
            var row=data.FranchiseHistory.datatable[i];
            var prev=data.FranchiseHistory.datatable[i-1];
            if(i==0){
                row.isActive=true
                }else if(row&&prev&&row.TEAM_ID!=prev.TEAM_ID){
                row.isActive=true
                }
            }
        var datasets=[{
        title:"Active Franchises",
        datatable:data.FranchiseHistory.datatable
        },{
        title:"Defunct Franchises",
        datatable:data.DefunctTeams.datatable
        }];
    return datasets
    }
    function get(params){
    var deferred=$q.defer();
    StatsRequest.get("franchiseHistory","",params).then(function(){
        var data=StatsRequest.getData();
        var datasets=parse(data);
        deferred.resolve(datasets)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("LeagueLeadersService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leagueLeaders","",params).then(function(){
            var datasets=StatsRequest.getData();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeagueLineupsService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leagueLineups","",params).then(function(){
            var datasets=StatsRequest.getData();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeaguePlayerClutchService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leaguePlayerClutch","",params).then(function(){
            var datasets=StatsRequest.getData();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeaguePlayerGeneralService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leaguePlayerStats","",params).then(function(){
            var datasets=StatsRequest.getData();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeaguePlayerShootingService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function parse(data){
        var tableInfo=data.headers[0];
        var skip=tableInfo.columnsToSkip;
        var shotgroups=tableInfo.columnNames;
        var rows=data.rowSet;
        var arr=[];
        for(var i in rows){
            var row=rows[i];
            var obj={
                PLAYER_ID:row[0],
                PLAYER_NAME:row[1],
                TEAM_ID:row[2],
                TEAM_ABBREVIATION:row[3]
                };

            for(var g in shotgroups){
                var group=shotgroups[g];
                var alpha=skip+g*3;
                obj[group+" FGM"]=row[alpha+0];
                obj[group+" FGA"]=row[alpha+1];
                obj[group+" FG PCT"]=row[alpha+2]
                }
                arr.push(obj)
            }
            return[{
            name:"shots",
            datatable:arr
        }]
        }
        function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leaguePlayerShotLocations","",params).then(function(){
            var data=StatsRequest.getResults();
            var datasets=parse(data);
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeagueTeamClutchService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leagueTeamClutch","",params).then(function(){
            var datasets=StatsRequest.getData();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeagueTeamGeneralService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leagueTeamStats","",params).then(function(){
            var datasets=StatsRequest.getData();
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("LeagueTeamShootingService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function parse(data){
        var tableInfo=data.headers[0];
        var skip=tableInfo.columnsToSkip;
        var shotgroups=tableInfo.columnNames;
        var rows=data.rowSet;
        var arr=[];
        for(var i in rows){
            var row=rows[i];
            var obj={
                TEAM_ID:row[0],
                TEAM_NAME:row[1]
                };

            for(var g in shotgroups){
                var group=shotgroups[g];
                var alpha=skip+g*3;
                obj[group+" FGM"]=row[alpha+0];
                obj[group+" FGA"]=row[alpha+1];
                obj[group+" FG PCT"]=row[alpha+2]
                }
                arr.push(obj)
            }
            return[{
            name:"shots",
            datatable:arr
        }]
        }
        function get(params){
        var deferred=$q.defer();
        StatsRequest.get("leagueTeamShotLocations","",params).then(function(){
            var data=StatsRequest.getResults();
            var datasets=parse(data);
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("browser",["$window",function($window){
    return function(){
        var userAgent=$window.navigator.userAgent;
        var browsers={
            chrome:/chrome/i,
            safari:/safari/i,
            firefox:/firefox/i,
            ie:/trident/i
        };

        for(var key in browsers){
            if(browsers[key].test(userAgent)){
                return key
                }
            }
        return"unknown"
    }
}]);
stats.factory("Page",["$window","$rootScope","$cookies","FEEDS_CONFIG",function Page($window,$rootScope,$cookies,FEEDS_CONFIG){
    "use strict";
    var pageTitle=null;
    var siteName=null;
    var title=[];
    var permitLoading=true;
    function setTitle(newTitle){
        title=[];
        if(newTitle!=pageTitle){
            title.push(pageTitle)
            }
            if(siteName!="_siteName"){
            title.push(siteName)
            }
            $window.document.title=title.join(" | ")
        }
        function setLoading(bool){
        if(permitLoading||!bool){
            $rootScope.loading=bool
            }
        }
    function setPermitLoading(val){
    permitLoading=val
    }
    function isLoading(){
    return $rootScope.loading
    }
    function showLoading(val){
    permitLoading=val
    }
    return{
    title:function(){
        return title
        },
    setTitle:function(newTitle){
        setTitle(newTitle)
        },
    isLoading:function(){
        return isLoading
        },
    setLoading:function(val){
        setLoading(val)
        },
    setPermitLoading:function(val){
        setPermitLoading(val)
        },
    showLoading:function(val){
        showLoading(val)
        }
    }
}]);
stats.service("SocialService",["$q","$http",function($q,$http){
    var bitlyUrl="http://api.bitly.com/v3/shorten?format=json&apiKey=R_46b31735252665da66f63ede638288f1&login=nba450";
    function getLinks(url,title){
        var deferred=$q.defer();
        var bitly=bitlyUrl+"&longUrl="+url+"&callback=JSON_CALLBACK";
        $http.jsonp(bitly).success(function(data){
            deferred.resolve(data.data)
            });
        return deferred.promise
        }
        return{
        getLinks:getLinks
    }
}]);
stats.factory("Splits",["$window","$filter","$rootScope","$location","SPLITS_CONFIG",function Page($window,$filter,$rootScope,$location,SPLITS_CONFIG){
    var splits={};

    function findDefault(n){
        if(this.initial==n.val){
            this.selected=n;
            return true
            }
        }
    function findWithout(n){
    return this.indexOf(n.val)===-1
    }
    function createRange(start,end){
    var arr=[];
    for(var i=end;i>=start;i-=1){
        arr.push({
            val:i,
            text:i
        })
        }
        return arr
    }
    function createSeasonRange(start,end){
    var arr=[];
    for(var i=end;i>=start;i-=1){
        arr.push({
            val:$filter("seasonyear")(i),
            text:$filter("seasonyear")(i)
            })
        }
        return arr
    }
    function getStringSplit(name){
    var s=SPLITS_CONFIG[name];
    if(s){
        if(s.type=="select"){
            if($location.search()[name]){
                s.initial=$location.search()[name]
                }else{
                s.initial=s.default
                }
                s.selected=null;
            s.options.some(findDefault.bind(s))
            }
            if(s.type=="datepicker"){
            if($location.search()[name]){
                s.selected.val=$location.search()[name]
                }
            }
    }
return s
}
function getObjectSplit(obj){
    var s=angular.extend({},SPLITS_CONFIG[obj.name]);
    if(!s){
        return obj
        }
        if(obj.range){
        s.options=createRange(parseInt(obj.range[0],10),parseInt(obj.range[1],10))
        }
        if(obj.seasonRange){
        s.options=createSeasonRange(parseInt(obj.seasonRange[0],10),parseInt(obj.seasonRange[1],10))
        }
        if(obj.without){
        s.options=s.options.filter(findWithout.bind(obj.without))
        }
        if(obj.include){
        s.options=s.options.concat(obj.include)
        }
        if($location.search()[obj.name]){
        s.initial=$location.search()[obj.name]
        }else if(obj.initial){
        s.initial=obj.initial
        }else{
        s.initial=s.default
        }
        if(s.type=="select"){
        s.selected=null;
        s.options.some(findDefault.bind(s))
        }
        return s
    }
    function processSplitRequest(array){
    for(var i in array){
        var split=array[i];
        if(typeof split=="string"){
            splits[split]=getStringSplit(split)
            }else if(typeof split=="object"){
            splits[split.name]=getObjectSplit(split)
            }
        }
    return splits
}
return{
    get:function(array){
        return processSplitRequest(array)
        }
    }
}]);
stats.factory("StatsRequest",["$q","$http","$rootScope","FEEDS_CONFIG",function($q,$http,$rootScope,FEEDS_CONFIG){
    "use strict";
    var dataCache={};

    var base=this;
    function get(endpoint,path,parameters){
        var url=FEEDS_CONFIG.prefix+FEEDS_CONFIG[endpoint];
        var deferred=$q.defer();
        var promise=$http({
            url:url,
            method:FEEDS_CONFIG.requestMethod,
            params:parameters
        }).success(function(data,status){
            parseResultSets(data);
            base.dataCache=data;
            deferred.resolve()
            }).error(function(data,status){
            var error={
                url:url,
                status:data.status,
                message:"Remote server error"
            };

            reportError(error);
            deferred.resolve()
            });
        if(typeof ga!="undefined"){
            ga("send","event","stats-request",FEEDS_CONFIG[endpoint],JSON.stringify(parameters))
            }
            return deferred.promise
        }
        function parseResultSets(data){
        if(!data.resultSets&&data.resultSet){
            if($.isArray(data.resultSet)){
                data.resultSets=data.resultSet
                }else{
                data.resultSets=[data.resultSet]
                }
            }
        data.sets={};

    data.formatStatResponse=true;
    if(data.resultSets.length){
        $.each(data.resultSets,dataseterize.bind(this,data))
        }else{
        dataseterize.bind(data.resultSets,data)
        }
        data.datasets=data.sets
    }
    function dataseterize(resp,i,set){
    if(!set){
        return
    }
    var zipTableData=function(row,i){
        var datarow={
            id:i
        };

        for(var y in set.headers){
            var c=set.headers[y];
            var v=row[y];
            datarow[c]=v
            }
            return datarow
        };

    resp.sets[set.name]=set;
    set.datatable=$.map(set.rowSet,zipTableData)
    }
    function reportError(error){
    $rootScope.errors.push(error);
    if(FEEDS_CONFIG.debug){
        console.log($rootScope.errors)
        }
    }
return{
    get:get,
    getData:function(){
        return base.dataCache.datasets
        },
    getResults:function(){
        return base.dataCache.resultSets
        },
    parse:function(data){
        return parseResultSets(data)
        }
    }
}]);
stats.service("movementService",["$q","$filter","$http",function($q,$filter,$http){
    "use strict";
    function parseData(data){
        data.teams={};

        data.players={};

        var teamkeys=["home","visitor"];
        for(var i in teamkeys){
            var key=teamkeys[i];
            var team=data[key];
            var teamid=team.teamid;
            data.teams[teamid]=team;
            data.teams[teamid].type=key;
            for(var j in team.players){
                var player=team.players[j];
                player.name=player.firstname+" "+player.lastname;
                player.teamid=team.teamid;
                player.teamname=team.name;
                player.teamtype=team.type;
                data.players[player.playerid]=player
                }
            }
            data.frames=data.moments.map(parseMoment);
    return data
    }
    function parseMoment(moment){
    var i;
    var info={
        period:moment[0],
        timestamp:moment[1],
        gameclock:moment[2],
        shotclock:moment[3],
        eventid:moment[4]
        };

    var ps=moment[5].map(function(n,i){
        var obj={
            teamid:n[0],
            playerid:n[1],
            x:n[2]*10,
            y:n[3]*10,
            z:n[4]*10,
            hide:false
        };

        return obj
        });
    var obj={
        info:info,
        ball:ps[0],
        htm:ps.slice(1,6),
        vtm:ps.slice(6,11)
        };

    for(i in obj.vtm){
        obj.vtm[i].info=players[obj.vtm[i].playerid]
        }
        for(i in obj.htm){
        obj.htm[i].info=players[obj.htm[i].playerid]
        }
        return obj
    }
    function get(params){
    var deferred=$q.defer();
    var url="/stats/locations_getmoments/";
    console.log("get movement",url,params);
    $http({
        method:"GET",
        url:url,
        params:params
    }).success(function(response,status){
        var data=response;
        var movementData=parseData(data);
        deferred.resolve(movementData)
        }).error(function(response,status){
        console.log("error",response,status);
        deferred.resolve(false)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("PlayerSummaryService",["$q","$filter","SEASON_CONFIG","StatsRequest",function($q,$filter,SEASON_CONFIG,StatsRequest){
    "use strict";
    var parse=function(data){
        var player={
            headlineStats:data.PlayerHeadlineStats.datatable[0],
            playerInfo:data.CommonPlayerInfo.datatable[0]
            };

        player.playerInfo.POS=player.playerInfo.POSITION.split("-").map(function(n){
            return n.charAt(0)
            }).join("-");
        player.playerInfo.TO_YEAR=+player.playerInfo.TO_YEAR;
        player.playerInfo.FROM_YEAR=+player.playerInfo.FROM_YEAR;
        player.availableStats={
            current:player.playerInfo.TO_YEAR==SEASON_CONFIG.site.SeasonYear,
            tracking:player.playerInfo.TO_YEAR>=2013,
            stats:player.playerInfo.TO_YEAR>=1996,
            video:player.playerInfo.TO_YEAR>=2013
            };

        return player
        };

    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("playerSummary","",params).then(function(){
            var data=StatsRequest.getData();
            var player=parse(data);
            deferred.resolve(player)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("PlayerTrackingDashPassesService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function get(params){
        var deferred=$q.defer();
        StatsRequest.get("playerTrackingPasses","",params).then(function(){
            var data=StatsRequest.getData();
            var datasets=[{
                name:"Passes Made",
                datatable:data.PassesMade.datatable
                },{
                name:"Passes Received",
                datatable:data.PassesReceived.datatable
                }];
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("ScoresService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    var parse=function(data){
        var gamestates=["","pre","live","post"];
        var games=data.GameHeader.datatable;
        var avail=data.Available.datatable;
        var lastMeeting=data.LastMeeting.datatable;
        var series=data.SeriesStandings.datatable;
        var linescores=data.LineScore.datatable;
        var teamLeaders=data.TeamLeaders.datatable;
        var standings=[data.EastConfStandingsByDay,data.WestConfStandingsByDay];
        for(var i in games){
            var game=games[i];
            var gameid=game.GAME_ID;
            var htmid=game.HOME_TEAM_ID;
            var vtmid=game.VISITOR_TEAM_ID;
            game.teamLeaders={};

            game.available=$filter("filter")(avail,{
                GAME_ID:gameid
            })[0];
            game.lastMeeting=$filter("filter")(lastMeeting,{
                GAME_ID:gameid
            })[0];
            game.series=$filter("filter")(series,{
                GAME_ID:gameid
            })[0];
            game.linescores={
                htm:$filter("filter")(linescores,{
                    TEAM_ID:htmid
                })[0],
                vtm:$filter("filter")(linescores,{
                    TEAM_ID:vtmid
                })[0]
                };

            game.lineScoresArray=[game.linescores.vtm,game.linescores.htm];
            game.teamLeaders={
                htm:$filter("filter")(teamLeaders,{
                    TEAM_ID:htmid
                })[0],
                vtm:$filter("filter")(teamLeaders,{
                    TEAM_ID:vtmid
                })[0]
                };

            game.gamestate=gamestates[game.GAME_STATUS_ID];
            game.linescores.htm.isWinner=game.linescores.htm.PTS>game.linescores.vtm.PTS;
            game.linescores.vtm.isWinner=!game.linescores.htm.isWinner;
            game.linescores.htm.TEAM_ABBREVIATION=game.linescores.htm.TEAM_ABBREVIATION.trim();
            game.linescores.vtm.TEAM_ABBREVIATION=game.linescores.vtm.TEAM_ABBREVIATION.trim()
            }
            return{
            games:games,
            standings:standings
        }
    };

function get(params){
    var deferred=$q.defer();
    StatsRequest.get("scoreboard2","",params).then(function(){
        var data=StatsRequest.getData();
        var games=parse(data);
        deferred.resolve(games)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("ShotchartService",["$q","$filter","StatsRequest",function($q,$filter,StatsRequest){
    "use strict";
    function parse(data){
        var shots=data.Shot_Chart_Detail.datatable;
        var league=data.LeagueAverages.datatable;
        var groupedShots=groupShotsByZone(shots);
        var groupedLeague=groupShotsByZone(league);
        parseShotchartData(groupedShots,groupedLeague,"advanced");
        parseShotchartData(groupedShots,groupedLeague,"basic");
        var shotchart={
            shots:shots,
            league:league,
            groupedShots:groupedShots,
            groupedLeague:groupedLeague
        };

        return shotchart
        }
        function parseShotchartData(shots,league,type){
        var data={};

        for(var i in shots[type]){
            var s=shots[type][i];
            var l=league[type][i];
            s.leagueFG_PCT=l.FG_PCT;
            if(s.FG_PCT<l.FG_PCT*.9){
                s.leaguePerformance="below"
                }else if(s.FG_PCT>l.FG_PCT*1.1){
                s.leaguePerformance="above"
                }else{
                s.leaguePerformance="average"
                }
            }
        }
        function groupShotsByZone(shots){
    var data={
        basic:{},
        advanced:{}
};

for(var i in shots){
    var shot=shots[i];
    var basic=shot["SHOT_ZONE_BASIC"];
    var advanced=shot["SHOT_ZONE_AREA"]+" | "+shot["SHOT_ZONE_RANGE"];
    if(!data.basic[basic]){
        data.basic[basic]={};

        data.basic[basic].shots=[];
        data.basic[basic].FGM=0;
        data.basic[basic].FGA=0
        }
        if(!data.advanced[advanced]){
        data.advanced[advanced]={};

        data.advanced[advanced].shots=[];
        data.advanced[advanced].FGM=0;
        data.advanced[advanced].FGA=0
        }
        data.basic[basic].shots.push(shot);
    data.advanced[advanced].shots.push(shot);
    if(shot.SHOT_ATTEMPTED_FLAG){
        data.basic[basic].FGA+=shot.SHOT_ATTEMPTED_FLAG;
        data.basic[basic].FGM+=shot.SHOT_MADE_FLAG;
        data.advanced[advanced].FGA+=shot.SHOT_ATTEMPTED_FLAG;
        data.advanced[advanced].FGM+=shot.SHOT_MADE_FLAG
        }else{
        data.basic[basic].FGA+=shot.FGA||0;
        data.basic[basic].FGM+=shot.FGM||0;
        data.advanced[advanced].FGA+=shot.FGA||0;
        data.advanced[advanced].FGM+=shot.FGM||0
        }
    }
for(i in data.basic){
    data.basic[i].FG_PCT=data.basic[i].FGM/data.basic[i].FGA
    }
    for(i in data.advanced){
    data.advanced[i].FG_PCT=data.advanced[i].FGM/data.advanced[i].FGA
    }
    return data
}
function get(params){
    var deferred=$q.defer();
    StatsRequest.get("shotchart","",params).then(function(){
        var data=StatsRequest.getData();
        var shotchart=parse(data);
        deferred.resolve(shotchart)
        });
    return deferred.promise
    }
    return{
    get:get
}
}]);
stats.service("SportVuDataService",["$q","$filter","$http","StatsRequest",function($q,$filter,$http,StatsRequest){
    "use strict";
    function createUrl(params,category,section){
        var url="";
        url+="/js/data/sportvu/";
        url+=params.Season.substr(0,4);
        url+="/"+category;
        url+=section=="team"?"Team":"";
        url+="Data";
        url+=params.SeasonType=="Playoffs"?"Post":"";
        url+=".json";
        return url
        }
        function get(params,category,section){
        var deferred=$q.defer();
        var url=createUrl(params,category,section);
        $http({
            method:"GET",
            url:url
        }).then(function(response){
            var data=response.data;
            StatsRequest.parse(data);
            var datasets=[data.resultSets[0]];
            deferred.resolve(datasets)
            });
        return deferred.promise
        }
        return{
        get:get
    }
}]);
stats.service("PlayerVersusService",["$q","$filter","SEASON_CONFIG","StatsRequest",function($q,$filter,SEASON_CONFIG,StatsRequest){
    "use strict";
    function makeDatasets(obj,datasets){
        var i;
        for(i in datasets){
            datasets[i].name=datasets[i].name.replace(/([A-Z]+)/g,",$1");
            datasets[i].name=datasets[i].name.replace(/,/g," ")
            }
            obj.datasets={
            Overall:{},
            OnOffCourt:{}
    };

    if(obj.compare.left.type=="team"){
        obj.datasets.vsPlayerOverall={}
    }
    obj.shootingsets={
    ShotDistanceOverall:{},
    ShotDistanceOnCourt:{},
    ShotDistanceOffCourt:{},
    ShotAreaOverall:{},
    ShotAreaOnCourt:{},
    ShotAreaOffCourt:{}
};

for(i in datasets){
    if(obj.datasets[i]){
        obj.datasets[i]=datasets[i]
        }
        if(obj.shootingsets[i]){
        obj.shootingsets[i]=datasets[i]
        }
    }
obj.player={
    a:datasets.Overall.datatable[0],
    b:obj.compare.left.type=="team"?datasets.vsPlayerOverall.datatable[0]:datasets.Overall.datatable[1]
    };

obj.shootingsets=datasets;
for(i in obj.shootingsets){
    if(i.indexOf("Shot")<0){
        delete obj.shootingsets[i]
    }
}
obj.shootingByDistance=[obj.shootingsets.ShotDistanceOverall,obj.shootingsets.ShotDistanceOnCourt,obj.shootingsets.ShotDistanceOffCourt];
obj.shootingByArea=[obj.shootingsets.ShotAreaOverall,obj.shootingsets.ShotAreaOnCourt,obj.shootingsets.ShotAreaOffCourt];
if(obj.compare.left.type=="team"){
    if(obj.datasets.vsPlayerOverall&&obj.datasets.vsPlayerOverall.datatable.length>0){
        for(i in obj.datasets.vsPlayerOverall.datatable){
            if(obj.datasets.vsPlayerOverall.datatable[i]["TM_TOV_PCT"]){
                obj.datasets.vsPlayerOverall.datatable[i]["TM_TOV_PCT"]=obj.datasets.vsPlayerOverall.datatable[i]["TM_TOV_PCT"]/100
            }
        }
        }
    }else{
    if(obj.datasets.Overall&&obj.datasets.Overall.datatable.length>0){
        for(i in obj.datasets.Overall.datatable){
            if(obj.datasets.Overall.datatable[i]["TM_TOV_PCT"]){
                obj.datasets.Overall.datatable[i]["TM_TOV_PCT"]=obj.datasets.Overall.datatable[i]["TM_TOV_PCT"]/100
                }
            }
        }
        if(obj.datasets.OnOffCourt&&obj.datasets.OnOffCourt.datatable.length>0){
    for(i in obj.datasets.OnOffCourt.datatable){
        if(obj.datasets.OnOffCourt.datatable[i]["TM_TOV_PCT"]){
            obj.datasets.OnOffCourt.datatable[i]["TM_TOV_PCT"]=obj.datasets.OnOffCourt.datatable[i]["TM_TOV_PCT"]/100
            }
        }
    }
}
obj.isLoading=false
}
function getStats(obj){
    var defer=$q.defer();
    var type;
    if(obj.compare.left.hasPlayer){
        type="playerVsPlayer";
        obj.params.PlayerID=obj.compare.left.info.PERSON_ID;
        obj.params.VsPlayerID=obj.compare.right.info.PERSON_ID
        }
        if(obj.compare.left.hasTeam){
        type="teamVsPlayer";
        obj.params.TeamID=obj.compare.left.info.id;
        obj.params.VsPlayerID=obj.compare.right.info.PERSON_ID
        }
        if(obj.compare.left.hasLineup||obj.compare.right.hasLineup){
        type="playersVsPlayers";
        var lineupIDs=[obj.params.PlayerID1,obj.params.PlayerID2,obj.params.PlayerID3,obj.params.PlayerID4,obj.params.PlayerID5];
        var vsLineupIDs=[obj.params.VsPlayerID1,obj.params.VsPlayerID2,obj.params.VsPlayerID3,obj.params.VsPlayerID4,obj.params.VsPlayerID5];
        for(var i=0,len=obj.compare.left.lineupChosen.length;i<len;i++){
            lineupIDs[i]=obj.compare.left.lineupChosen[i].PLAYER_ID;
            vsLineupIDs[i]=obj.compare.right.lineupChosen[i].PLAYER_ID
            }
            for(var j in obj.params){
            for(var k=0,len2=lineupIDs.length;i<len2;i++){
                if(obj.params[lineupIDs[k]]){
                    obj.params[lineupIDs[k]]=lineupIDs[k]
                    }
                    if(obj.params[vsLineupIDs[k]]){
                    obj.params[VslineupIDs[k]]=vsLineupIDs[k]
                    }
                }
            }
        }
    obj.isLoading=true;
obj.showGraph=true;
StatsRequest.get(type,"",obj.params).then(function(){
    var datasets=StatsRequest.getData();
    makeDatasets(obj,datasets);
    obj.isLoading=false;
    defer.resolve()
    });
return defer.promise
}
return{
    getStats:getStats
}
}]);
stats.controller("CVPCtrl",["$scope","$rootScope","$element","$http","$filter",function($scope,$rootScope,$element,$http,$filter){
    $scope.message="CVP player"
    }]);
stats.controller("DraftCtrl",["$scope","$location","Splits","$filter","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,$filter,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits={};

    $scope.splits.SeasonYear=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.DraftCombineSummary.Season,
        seasonRange:[SEASON_CONFIG.DraftCombineSummary.SeasonYearFrom,SEASON_CONFIG.DraftCombineSummary.SeasonYear]
        }]).Season;
    $scope.params={
        LeagueID:"00",
        SeasonYear:$scope.splits.SeasonYear.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("draft","",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            console.log($scope.datasets);
            $scope.isLoading=false
            })
        }
        $scope.onrunit=function(){
        var search={};

        for(var i in $scope.splits){
            var val=$scope.splits[i].selected.val;
            if(val!=$scope.splits[i].default){
                search[i]=val
                }
                $scope.params[i]=$scope.splits[i].selected.val
            }
            $location.search(search);
        getStats()
        };

    getStats()
    }]);
stats.controller("DraftCombineAgilityCtrl",["$scope","Splits","SEASON_CONFIG","DraftCombineAgilityService",function($scope,Splits,SEASON_CONFIG,DraftCombineAgilityService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits={};

    $scope.splits.SeasonYear=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.DraftCombineAgility.Season,
        seasonRange:[SEASON_CONFIG.DraftCombineAgility.SeasonYearFrom,SEASON_CONFIG.DraftCombineAgility.SeasonYear]
        }]).Season;
    $scope.params={
        LeagueID:"00",
        SeasonYear:$scope.splits.SeasonYear.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        DraftCombineAgilityService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("DraftCombineAnthroCtrl",["$scope","Splits","SEASON_CONFIG","DraftCombineAnthroService",function($scope,Splits,SEASON_CONFIG,DraftCombineAnthroService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=100;
    $scope.splits={};

    $scope.splits.SeasonYear=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.DraftCombineAnthro.Season,
        seasonRange:[SEASON_CONFIG.DraftCombineAnthro.SeasonYearFrom,SEASON_CONFIG.DraftCombineAnthro.SeasonYear]
        }]).Season;
    $scope.params={
        LeagueID:"00",
        SeasonYear:$scope.splits.SeasonYear.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        DraftCombineAnthroService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("draftCombineNavCtrl",["$scope","$location","$route",function($scope,$location,$route){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"summary",
        path:"",
        text:"Summary"
    },{
        page:"spotup",
        path:"spotup",
        text:"Pop Up Shooting"
    },{
        page:"nonstationary",
        path:"nonstationary",
        text:"Non Stationary Shooting"
    },{
        page:"agility",
        path:"agility",
        text:"Strength & Agility"
    },{
        page:"anthro",
        path:"anthro",
        text:"Anthropometric Stats"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.selected.path)
        }
    }]);
stats.controller("DraftCombineNonStationaryCtrl",["$scope","Splits","SEASON_CONFIG","DraftCombineNonStationaryService",function($scope,Splits,SEASON_CONFIG,DraftCombineNonStationaryService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits={};

    $scope.splits.SeasonYear=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.DraftCombineNonstationary.Season,
        seasonRange:[SEASON_CONFIG.DraftCombineNonstationary.SeasonYearFrom,SEASON_CONFIG.DraftCombineNonstationary.SeasonYear]
        }]).Season;
    $scope.params={
        LeagueID:"00",
        SeasonYear:$scope.splits.SeasonYear.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        DraftCombineNonStationaryService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("DraftCombineSpotUpCtrl",["$scope","Splits","SEASON_CONFIG","DraftCombineSpotUpService",function($scope,Splits,SEASON_CONFIG,DraftCombineSpotUpService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits={};

    $scope.splits.SeasonYear=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.DraftCombineSpotUp.Season,
        seasonRange:[SEASON_CONFIG.DraftCombineSpotUp.SeasonYearFrom,SEASON_CONFIG.DraftCombineSpotUp.SeasonYear]
        }]).Season;
    $scope.params={
        LeagueID:"00",
        SeasonYear:$scope.splits.SeasonYear.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        DraftCombineSpotUpService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("DraftCombineSummaryCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.combine=[];
    $scope.splits={};

    $scope.splits.SeasonYear=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.DraftCombineSummary.Season,
        seasonRange:[SEASON_CONFIG.DraftCombineSummary.SeasonYearFrom,SEASON_CONFIG.DraftCombineSummary.SeasonYear]
        }]).Season;
    $scope.params={
        LeagueID:"00",
        SeasonYear:$scope.splits.SeasonYear.selected.val
        };

    $scope.filterCombineData=function(category,direction){
        var datatable=$scope.combine.slice(0);
        if(!datatable[0]||typeof datatable[0][category]=="undefined"){
            return
        }
        if(direction){
            datatable.sort(function(a,b){
                if(a[category]==null){
                    return 1
                    }else if(a[category]===0){
                    return 1
                    }else if(b[category]===0){
                    return-1
                    }else if(a[category]<b[category]){
                    return-1
                    }else if(a[category]>b[category]){
                    return 1
                    }else{
                    return 0
                    }
                })
        }else{
        datatable.sort(function(a,b){
            if(a[category]>b[category]){
                return-1
                }else if(a[category]<b[category]){
                return 1
                }else{
                return 0
                }
            })
    }
    return datatable.slice(0,10)
    };

function getStats(){
    $scope.isLoading=true;
    StatsRequest.get("draftCombineSummary","",$scope.params).then(function(){
        var datasets=StatsRequest.getResults();
        $scope.combine=datasets[0].datatable;
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    var search={};

    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            search[i]=val
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        $location.search(search);
    getStats()
    };

getStats()
    }]);
stats.controller("HomepageShotChartsCtrl",["$scope","$location","$http","TEAMS",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/shotCharts/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data.slice(0,3);
        $scope.message=" this is from the history controller";
        $scope.isLoading=false
        })
    }]);
stats.controller("HomepageThisDayInHistoryCtrl",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/statsv2-glossary-585341/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        console.log(data);
        $scope.data=data.slice(0,5);
        $scope.message=" this is from the history controller";
        $scope.isLoading=false;
        console.log($scope.data)
        })
    });
stats.controller("FantasyNewsCtrl",function($scope,$location,$http,$filter,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/RotoWirePlayers-583598/masterlist.json"
    }).then(function(response){
        var data=response.data;
        var getToday=new Date;
        var getYesterday=$filter("date")(new Date(getToday.getTime()-24*60*60*1e3),"MM/dd/yyyy h:mm:ss a");
        var getData=[];
        var i=0;
        $.each(data.ListItems,function(){
            var item=data.ListItems[i];
            if(item.ListItemPubDate>getYesterday){
                getData.push({
                    ListItemCaption:item.ListItemCaption,
                    ListItemDescription:item.ListItemDescription,
                    ListItemPubDate:item.ListItemPubDate,
                    PlayerID:item.PlayerID,
                    FirstName:item.FirstName,
                    LastName:item.LastName
                    })
                }
                i++
        });
        $scope.data=getData;
        $scope.isLoading=false
        })
    });
stats.controller("BoxscoreAdvancedCtrl",["$scope","$filter","boxscoreAdvancedService",function($scope,$filter,boxscoreAdvancedService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.periods=[{
        text:"All Periods",
        StartRange:"0000",
        EndRange:"55800",
        RangeType:2
    },{
        text:"1st Period",
        StartRange:"0000",
        EndRange:"7200",
        RangeType:2
    },{
        text:"2nd Period",
        StartRange:"7200",
        EndRange:"14400",
        RangeType:2
    },{
        text:"3rd Period",
        StartRange:"14400",
        EndRange:"21600",
        RangeType:2
    },{
        text:"4th Period",
        StartRange:"21600",
        EndRange:"28800",
        RangeType:2
    },{
        text:"1st Half",
        StartRange:"0000",
        EndRange:"14400",
        RangeType:2
    },{
        text:"2nd - 3rd",
        StartRange:"7200",
        EndRange:"21600",
        RangeType:2
    },{
        text:"2nd Half",
        StartRange:"14400",
        EndRange:"28800",
        RangeType:2
    }];
    $scope.period=$scope.periods[0];
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    $scope.gametimeFormatter=function(value){
        if(!value){
            return value
            }else{
            return $filter("wallclock")(value)
            }
        };

function getStats(){
    $scope.isLoading=true;
    boxscoreAdvancedService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
        $scope.datasets=[linescores.vtm,linescores.htm];
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.$watch("period",function(period){
    $scope.params.StartRange=period.StartRange;
    $scope.params.EndRange=period.EndRange
    });
$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.sliderStartRange=0;
    $scope.sliderEndRange=$filter("decimalTime")(boxscore.summary.LIVE_PERIOD);
    $scope.periods[0].EndRange=$scope.sliderEndRange;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:$scope.sliderStartRange,
        EndRange:$scope.sliderEndRange
        };

    if($scope.params.SeasonType=="Preseason"){
        $scope.noData=true;
        $scope.isLoading=false;
        return
    }
    getStats()
    })
}]);
stats.controller("BoxscoreFourFactorsCtrl",["$scope","$filter","boxscoreFourFactorsService",function($scope,$filter,boxscoreFourFactorsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.periods=[{
        text:"All Periods",
        StartRange:"0000",
        EndRange:"55800",
        RangeType:2
    },{
        text:"1st Period",
        StartRange:"0000",
        EndRange:"7200",
        RangeType:2
    },{
        text:"2nd Period",
        StartRange:"7200",
        EndRange:"14400",
        RangeType:2
    },{
        text:"3rd Period",
        StartRange:"14400",
        EndRange:"21600",
        RangeType:2
    },{
        text:"4th Period",
        StartRange:"21600",
        EndRange:"28800",
        RangeType:2
    },{
        text:"1st Half",
        StartRange:"0000",
        EndRange:"14400",
        RangeType:2
    },{
        text:"2nd - 3rd",
        StartRange:"7200",
        EndRange:"21600",
        RangeType:2
    },{
        text:"2nd Half",
        StartRange:"14400",
        EndRange:"28800",
        RangeType:2
    }];
    $scope.period=$scope.periods[0];
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    $scope.gametimeFormatter=function(value){
        if(!value){
            return value
            }else{
            return $filter("wallclock")(value)
            }
        };

function getStats(){
    $scope.isLoading=true;
    boxscoreFourFactorsService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
        $scope.datasets=[linescores.vtm,linescores.htm];
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.$watch("period",function(period){
    $scope.params.StartRange=period.StartRange;
    $scope.params.EndRange=period.EndRange
    });
$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.sliderStartRange=0;
    $scope.sliderEndRange=$filter("decimalTime")(boxscore.summary.LIVE_PERIOD);
    $scope.periods[0].EndRange=$scope.sliderEndRange;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:$scope.sliderStartRange,
        EndRange:$scope.sliderEndRange
        };

    if($scope.params.SeasonType=="Preseason"){
        $scope.noData=true;
        $scope.isLoading=false;
        return
    }
    getStats()
    })
}]);
stats.controller("BoxscoreMiscCtrl",["$scope","$filter","boxscoreMiscService",function($scope,$filter,boxscoreMiscService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.periods=[{
        text:"All Periods",
        StartRange:"0000",
        EndRange:"55800",
        RangeType:2
    },{
        text:"1st Period",
        StartRange:"0000",
        EndRange:"7200",
        RangeType:2
    },{
        text:"2nd Period",
        StartRange:"7200",
        EndRange:"14400",
        RangeType:2
    },{
        text:"3rd Period",
        StartRange:"14400",
        EndRange:"21600",
        RangeType:2
    },{
        text:"4th Period",
        StartRange:"21600",
        EndRange:"28800",
        RangeType:2
    },{
        text:"1st Half",
        StartRange:"0000",
        EndRange:"14400",
        RangeType:2
    },{
        text:"2nd - 3rd",
        StartRange:"7200",
        EndRange:"21600",
        RangeType:2
    },{
        text:"2nd Half",
        StartRange:"14400",
        EndRange:"28800",
        RangeType:2
    }];
    $scope.period=$scope.periods[0];
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    $scope.gametimeFormatter=function(value){
        if(!value){
            return value
            }else{
            return $filter("wallclock")(value)
            }
        };

function getStats(){
    $scope.isLoading=true;
    boxscoreMiscService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
        $scope.datasets=[linescores.vtm,linescores.htm];
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.$watch("period",function(period){
    $scope.params.StartRange=period.StartRange;
    $scope.params.EndRange=period.EndRange
    });
$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.sliderStartRange=0;
    $scope.sliderEndRange=$filter("decimalTime")(boxscore.summary.LIVE_PERIOD);
    $scope.periods[0].EndRange=$scope.sliderEndRange;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:$scope.sliderStartRange,
        EndRange:$scope.sliderEndRange
        };

    if($scope.params.SeasonType=="Preseason"){
        $scope.noData=true;
        $scope.isLoading=false;
        return
    }
    getStats()
    })
}]);
stats.controller("BoxscoreScoringCtrl",["$scope","$filter","boxscoreScoringService",function($scope,$filter,boxscoreScoringService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.periods=[{
        text:"All Periods",
        StartRange:"0000",
        EndRange:"55800",
        RangeType:2
    },{
        text:"1st Period",
        StartRange:"0000",
        EndRange:"7200",
        RangeType:2
    },{
        text:"2nd Period",
        StartRange:"7200",
        EndRange:"14400",
        RangeType:2
    },{
        text:"3rd Period",
        StartRange:"14400",
        EndRange:"21600",
        RangeType:2
    },{
        text:"4th Period",
        StartRange:"21600",
        EndRange:"28800",
        RangeType:2
    },{
        text:"1st Half",
        StartRange:"0000",
        EndRange:"14400",
        RangeType:2
    },{
        text:"2nd - 3rd",
        StartRange:"7200",
        EndRange:"21600",
        RangeType:2
    },{
        text:"2nd Half",
        StartRange:"14400",
        EndRange:"28800",
        RangeType:2
    }];
    $scope.period=$scope.periods[0];
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    $scope.gametimeFormatter=function(value){
        if(!value){
            return value
            }else{
            return $filter("wallclock")(value)
            }
        };

function getStats(){
    $scope.isLoading=true;
    boxscoreScoringService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
        $scope.datasets=[linescores.vtm,linescores.htm];
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.$watch("period",function(period){
    $scope.params.StartRange=period.StartRange;
    $scope.params.EndRange=period.EndRange
    });
$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.sliderStartRange=0;
    $scope.sliderEndRange=$filter("decimalTime")(boxscore.summary.LIVE_PERIOD);
    $scope.periods[0].EndRange=$scope.sliderEndRange;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:$scope.sliderStartRange,
        EndRange:$scope.sliderEndRange
        };

    if($scope.params.SeasonType=="Preseason"){
        $scope.noData=true;
        $scope.isLoading=false;
        return
    }
    getStats()
    })
}]);
stats.controller("BoxscoreTraditionalCtrl",["$scope","$filter","boxscoreTraditionalService",function($scope,$filter,boxscoreTraditionalService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.ai={};

    $scope.periods=[{
        text:"All Periods",
        StartRange:"0000",
        EndRange:"55800",
        RangeType:2
    },{
        text:"1st Period",
        StartRange:"0000",
        EndRange:"7200",
        RangeType:2
    },{
        text:"2nd Period",
        StartRange:"7200",
        EndRange:"14400",
        RangeType:2
    },{
        text:"3rd Period",
        StartRange:"14400",
        EndRange:"21600",
        RangeType:2
    },{
        text:"4th Period",
        StartRange:"21600",
        EndRange:"28800",
        RangeType:2
    },{
        text:"1st Half",
        StartRange:"0000",
        EndRange:"14400",
        RangeType:2
    },{
        text:"2nd - 3rd",
        StartRange:"7200",
        EndRange:"21600",
        RangeType:2
    },{
        text:"2nd Half",
        StartRange:"14400",
        EndRange:"28800",
        RangeType:2
    }];
    $scope.period=$scope.periods[0];
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    $scope.gametimeFormatter=function(value){
        if(!value){
            return value
            }else{
            return $filter("wallclock")(value)
            }
        };

function getStats(){
    $scope.isLoading=true;
    boxscoreTraditionalService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
        $scope.datasets=[linescores.vtm,linescores.htm];
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.$watch("period",function(period){
    $scope.params.StartRange=period.StartRange;
    $scope.params.EndRange=period.EndRange
    });
$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.sliderStartRange=0;
    $scope.sliderEndRange=$filter("decimalTime")(boxscore.summary.LIVE_PERIOD);
    $scope.periods[0].EndRange=$scope.sliderEndRange;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:$scope.sliderStartRange,
        EndRange:$scope.sliderEndRange
        };

    $scope.ai={
        gamedate:boxscore.gameInfo.GAME_DATE,
        gamename:boxscore.teams.vtm.TEAM_CITY_NAME+" "+boxscore.teams.vtm.TEAM_NICKNAME+" @ "+boxscore.teams.htm.TEAM_CITY_NAME+" "+boxscore.teams.htm.TEAM_NICKNAME
        };

    getStats()
    })
}]);
stats.controller("BoxscoreUsageCtrl",["$scope","$filter","boxscoreUsageService",function($scope,$filter,boxscoreUsageService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.periods=[{
        text:"All Periods",
        StartRange:"0000",
        EndRange:"55800",
        RangeType:2
    },{
        text:"1st Period",
        StartRange:"0000",
        EndRange:"7200",
        RangeType:2
    },{
        text:"2nd Period",
        StartRange:"7200",
        EndRange:"14400",
        RangeType:2
    },{
        text:"3rd Period",
        StartRange:"14400",
        EndRange:"21600",
        RangeType:2
    },{
        text:"4th Period",
        StartRange:"21600",
        EndRange:"28800",
        RangeType:2
    },{
        text:"1st Half",
        StartRange:"0000",
        EndRange:"14400",
        RangeType:2
    },{
        text:"2nd - 3rd",
        StartRange:"7200",
        EndRange:"21600",
        RangeType:2
    },{
        text:"2nd Half",
        StartRange:"14400",
        EndRange:"28800",
        RangeType:2
    }];
    $scope.period=$scope.periods[0];
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    $scope.gametimeFormatter=function(value){
        if(!value){
            return value
            }else{
            return $filter("wallclock")(value)
            }
        };

function getStats(){
    $scope.isLoading=true;
    boxscoreUsageService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
        $scope.datasets=[linescores.vtm,linescores.htm];
        $scope.isLoading=false
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.$watch("period",function(period){
    $scope.params.StartRange=period.StartRange;
    $scope.params.EndRange=period.EndRange
    });
$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.sliderStartRange=0;
    $scope.sliderEndRange=$filter("decimalTime")(boxscore.summary.LIVE_PERIOD);
    $scope.periods[0].EndRange=$scope.sliderEndRange;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:$scope.sliderStartRange,
        EndRange:$scope.sliderEndRange
        };

    if($scope.params.SeasonType=="Preseason"){
        $scope.noData=true;
        $scope.isLoading=false;
        return
    }
    getStats()
    })
}]);
stats.controller("BoxscoreNavCtrl",["$scope","$route","$location",function($scope,$route,$location){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.section=$route.current.section;
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"boxscore",
        path:"",
        text:"Traditional Boxscore"
    },{
        page:"advanced",
        path:"advanced",
        text:"Advanced Stats"
    },{
        page:"misc",
        path:"misc",
        text:"Misc Stats"
    },{
        page:"scoring",
        path:"scoring",
        text:"Scoring Stats"
    },{
        page:"usage",
        path:"usage",
        text:"Usage Stats"
    },{
        page:"fourfactors",
        path:"fourfactors",
        text:"Four Factors"
    },{
        page:"playbyplay",
        path:"playbyplay",
        text:"Play By Play"
    },{
        page:"playertracking",
        path:"playertracking",
        text:"Player Tracking"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.GameID+"/"+$scope.selected.path)
        }
    }]);
stats.controller("BoxscorePlayByPlayCtrl",["$scope","$location","$filter","$anchorScroll","boxscorePlayByPlayService","$timeout",function($scope,$location,$filter,$anchorScroll,boxscorePlayByPlayService,$timeout){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.wait=20;
    var periods=[{
        text:"Q1",
        period:1
    },{
        text:"Q2",
        period:2
    },{
        text:"Q3",
        period:3
    },{
        text:"Q4",
        period:4
    },{
        text:"OT1",
        period:5
    },{
        text:"OT2",
        period:6
    },{
        text:"OT3",
        period:7
    },{
        text:"OT4",
        period:8
    },{
        text:"OT5",
        period:9
    },{
        text:"OT6",
        period:10
    },{
        text:"OT7",
        period:11
    },{
        text:"OT8",
        period:12
    },{
        text:"OT9",
        period:13
    },{
        text:"OT10",
        period:14
    }];
    function getStats(){
        $scope.isLoading=true;
        boxscorePlayByPlayService.get($scope.params).then(function(plays){
            $scope.plays=plays;
            $scope.noData=plays.length===0;
            if($scope.noData){
                $scope.isLoading=false;
                return
            }
            var numPeriods=plays.slice(-1)[0].PERIOD;
            $scope.periods=periods.slice(0,numPeriods);
            addToDom();
            $scope.$watch("wait",function(){
                if($scope.wait>$scope.plays.length/10){
                    $scope.lazyLoading=true;
                    $scope.isLoading=false
                    }
                    if($scope.wait>$scope.plays.length){
                    $timeout.cancel(stopped);
                    $scope.lazyLoading=false
                    }
                })
        })
    }
    var stopped;
var addToDom=function(){
    $scope.isLoading=true;
    stopped=$timeout(function(){
        $scope.isLoading=false;
        $scope.wait+=50;
        addToDom()
        },500)
    };

$scope.setPeriod=function(p){
    $location.hash("qtr"+p);
    $anchorScroll()
    };

$scope.filterPeriod=function(item){
    if($scope.selectedPeriod===0){
        return item
        }else{
        return item.PERIOD===$scope.selectedPeriod?item:false
        }
    };

$scope.$watch("boxscore",function(boxscore){
    if(!boxscore){
        return
    }
    var GameID=boxscore.summary.GAME_ID;
    $scope.params={
        GameID:GameID,
        SeasonType:$filter("seasontype")(GameID),
        Season:$filter("seasonid")(GameID),
        RangeType:2,
        StartPeriod:1,
        EndPeriod:10,
        StartRange:0,
        EndRange:55800
    };

    getStats()
    })
}]);
stats.controller("BoxscorePlayerTrackingCtrl",["$scope","$filter","boxscorePlayerTrackingService",function($scope,$filter,boxscorePlayerTrackingService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.hasError=false;
    $scope.didPlay=function(row){
        return row.COMMENT===""
        };

    $scope.didNotPlay=function(row){
        return row.COMMENT!==""
        };

    function getStats(){
        $scope.isLoading=true;
        boxscorePlayerTrackingService.get($scope.params,$scope.boxscore.summary.HOME_TEAM_ID,$scope.boxscore.summary.VISITOR_TEAM_ID).then(function(linescores){
            $scope.datasets=[linescores.vtm,linescores.htm];
            $scope.isLoading=false
            })
        }
        $scope.$watch("boxscore",function(boxscore){
        if(!boxscore){
            return
        }
        var GameID=boxscore.summary.GAME_ID;
        $scope.params={
            GameID:GameID,
            SeasonType:$filter("seasontype")(GameID),
            Season:$filter("seasonid")(GameID),
            RangeType:2,
            StartPeriod:1,
            EndPeriod:10,
            StartRange:0,
            EndRange:55800
        };

        getStats()
        })
    }]);
stats.controller("GameSummaryCtrl",["$scope","$routeParams","boxscoreSummaryService",function($scope,$routeParams,boxscoreSummaryService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        boxscoreSummaryService.get($scope.params).then(function(boxscore){
            $scope.boxscore=boxscore;
            $scope.summary=boxscore.summary;
            $scope.officials=boxscore.officials;
            $scope.gameInfo=boxscore.gameInfo;
            $scope.av=boxscore.av;
            $scope.teams=boxscore.teams;
            $scope.linescores=boxscore.teams;
            $scope.otherStats=boxscore.otherStats;
            $scope.thisSeason=boxscore.season;
            $scope.seasonType=boxscore.seasontype;
            $scope.isLoading=false
            })
        }
        $scope.$on("$routeChangeSuccess",function(event,routeData){
        if(!$routeParams.GameID||$routeParams.GameID==$scope.GameID){
            return
        }
        $scope.GameID=$routeParams.GameID;
        $scope.params={
            GameID:$scope.GameID
            };

        getStats()
        })
    }]);
stats.controller("GlossaryCtrl",function($scope,$location,$http,$timeout,TEAMS){
    "use strict";
    $scope.isLoading=true;
    var groupCategories=function(data){
        var obj={};

        for(var i in data){
            var item=data[i];
            var cat=item.ListItemImageCaption;
            if(!obj[cat]){
                obj[cat]=[]
                }
                obj[cat].push(item)
            }
            return obj
        };

    $http({
        method:"GET",
        url:"/feeds/statsv2-glossary-585341/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.categories=groupCategories(data);
        $scope.isLoading=false;
        $timeout(function(){
            var def=$location.search().definition;
            if(def){
                var openItem="#"+def;
                $("html, body").stop().animate({
                    scrollTop:$(openItem).offset().top
                    },1e3)
                }
            },1e3)
    })
});
stats.controller("VideoStatusCtrl",["$scope","$location","StatsRequest",function($scope,$location,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.hasGames=false;
    $scope.params={
        LeagueID:"00",
        gameDate:""
    };

    $scope.$watch(function(){
        return $location.path()
        },function(){
        if($location.path().slice(1)){
            $scope.params.gameDate=$location.path().slice(1);
            getStats()
            }
        });
function getStats(){
    $scope.isLoading=true;
    StatsRequest.get("videoStatus","",$scope.params).then(function(){
        $scope.datasets=StatsRequest.getData();
        $scope.isLoading=false;
        $scope.hasGames=!!$scope.datasets.VideoStatus.datatable.length
        })
    }
}]);
stats.controller("HelpWhatsNewCtrl",function($scope,$location,$http,$sce){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/StatsWhatsNew-589235/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data;
        $scope.renderHtml=function(data){
            return $sce.trustAsHtml(data)
            };

        $scope.isLoading=false
        })
    });
stats.controller("FranchiseHistoryCtrl",["$scope","FranchiseHistoryService",function($scope,FranchiseHistoryService){
    "use strict";
    $scope.isLoading=true;
    $scope.rowsPerPage=1e3;
    $scope.params={
        LeagueID:"00"
    };

    $scope.datasets={};

    function getStats(){
        $scope.isLoading=true;
        FranchiseHistoryService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        getStats()
    }]);
stats.controller("HomepageAwardsCtrl",function($scope){
    "use strict";
    $scope.moreShown=false;
    if($scope.moreShown){
        $scope.showMore()
        }
        $scope.showMore=function(){
        $scope.moreShown=true
        };

    $scope.showLess=function(){
        $scope.moreShown=false
        }
    });
stats.controller("AwardsAccordionCtrl",function($scope){
    $scope.oneAtATime=true;
    $scope.status={
        isFirstOpen:true,
        isFirstDisabled:false
    }
});
stats.controller("HomepageBeyondTheNumbersCtrl",function($scope,$location,$http,$sce,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/StatsBeyondTheNumbersV2-594371/json.js"
    }).then(function(response){
        var slides=response.data.ListItems;
        $scope.trustAsHtml=$sce.trustAsHtml;
        $scope.slides=slides.slice(0,5);
        $scope.isLoading=false
        })
    });
stats.controller("CarouselBeyondTheNumbersCtrl",function($scope){
    $scope.myInterval=5e3
    });
stats.controller("HomepageFantasyNewsCtrl",function($scope,$location,$http,$filter,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/RotoWirePlayers-583598/masterslimlist.json"
    }).then(function(response){
        var data=response.data;
        var getToday=new Date;
        var getYesterday=$filter("date")(new Date(getToday.getTime()-24*60*60*1e3),"MM/dd/yyyy h:mm:ss a");
        var getData=[];
        var i=0;
        $.each(data.ListItems,function(){
            var item=data.ListItems[i];
            if(item.ListItemPubDate>getYesterday){
                getData.push({
                    ListItemCaption:item.ListItemCaption,
                    ListItemDescription:item.ListItemDescription,
                    ListItemPubDate:item.ListItemPubDate,
                    PlayerID:item.PlayerID
                    })
                }
                i++
        });
        $scope.data=getData.slice(0,3);
        $scope.isLoading=false
        })
    });
stats.controller("HomepageGlossaryCtrl",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/statsv2-glossary-585341/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data.slice(0,1);
        $scope.isLoading=false
        })
    });
stats.controller("HomepageHeadlinesCtrl",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/StatsV2Headlnes-589800/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data.slice(0,5);
        $scope.isLoading=false
        })
    });
stats.controller("HomepagePlayerListCtrl",["$scope","$timeout","SEASON_CONFIG","StatsRequest","$window",function($scope,$timeout,SEASON_CONFIG,StatsRequest,$window){
    "use strict";
    $scope.isLoading=true;
    $scope.currentFilter="a";
    $scope.currentFilterString="";
    $scope.rosterStatus="Active";
    $scope.players=[];
    var params={
        Season:SEASON_CONFIG.site.Season,
        LeagueID:"00",
        IsOnlyCurrentSeason:"0"
    };

    var players=[];
    var rosterPlayers=[];
    var mobilePlayers={};

    var searched=false;
    var filterInactive=function(n){
        return n.ROSTERSTATUS===1
        };

    var filterByLastName=function(n){
        return true;
        n.DISPLAY_LAST_COMMA_FIRST.charAt(0).toLowerCase()==$scope.currentFilter
        };

    var filterByString=function(n){
        return n.DISPLAY_LAST_COMMA_FIRST.charAt(0).toLowerCase()==$scope.currentFilterString
        };

    var isVisible=function(e){
        var h=$(window).height()+10;
        var top=$(window).scrollTop()-10;
        var y=$(e).offset().top;
        return y>top&&y<top+h&&y+$(e).height()<top+h
        };

    $scope.buildMobilePlayers=function(){
        rosterPlayers.forEach(function(j){
            var char=j.DISPLAY_LAST_COMMA_FIRST.charAt(0).toLowerCase();
            if(!mobilePlayers[char])mobilePlayers[char]=[];
            mobilePlayers[char].push(j)
            })
        };

    var filterByFirstLetterLastName=function(l){
        var char=$scope.currentFilter;
        var pattern="^"+char.toUpperCase();
        var regex=new RegExp(pattern);
        if(l.DISPLAY_LAST_COMMA_FIRST.match(regex)){
            return l.DISPLAY_LAST_COMMA_FIRST
            }
        };

$scope.filterPlayersByLastNameOnClick=function(v){
    $scope.currentFilter=v;
    $scope.players=rosterPlayers.filter(filterByFirstLetterLastName)
    };

$scope.filterPlayersByLastName=function(v){
    $scope.currentFilter=v;
    $scope.players=rosterPlayers.filter(filterByLastName)
    };

$scope.filterPlayersByString=function(){
    $scope.currentFilterString="";
    $scope.players=rosterPlayers.filter(filterByString)
    };

$scope.filterRosterStatus=function(status){
    $scope.rosterStatus=status;
    if(status=="Active")rosterPlayers=players;else rosterPlayers=players;
    $scope.filterPlayersByLastName($scope.currentFilter);
    $scope.buildMobilePlayers()
    };

var handleScroll=function(){
    angular.element(".player-alpha").toArray().reverse().forEach(function(elem){
        if(isVisible(elem))$scope.current=elem.id
            });
    angular.element(".letter").removeClass("letter-bold");
    angular.element("#letter-"+$scope.current).addClass("letter-bold");
    handleResize();
    $scope.$apply()
    };

var handleResize=function(){
    angular.element(".letter-nav").css("height",Math.max(document.documentElement.clientHeight,window.innerHeight||0)+"px");
    angular.element(".letter-nav").css("top",Math.max($($(".list.row")[0]).offset().top-window.scrollY,0)+"px")
    };

$scope.current="a";
$scope.mobilePlayers=mobilePlayers;
$scope.IS_MOBILE=false;
$scope.$watch(function(){
    return $window.IS_MOBILE
    },function(n,o){
    $scope.IS_MOBILE=n?n:false;
    console.log($scope.IS_MOBILE)
    });
angular.element(window).bind("scroll",handleScroll);
    angular.element(window).bind("resize",handleResize);
    angular.element(window).bind("load",function(){
    handleScroll();
    handleResize()
    });
$scope.listPlayers=function(){
    return $scope.searched
    };

$scope.playersSearched=function(){
    $scope.searched=true;
    return $scope.searched
    };

StatsRequest.get("playerList","",params).then(function(){
    players=StatsRequest.getData().CommonAllPlayers.datatable;
    $scope.filterRosterStatus($scope.rosterStatus);
    $scope.isLoading=false
    })
}]);
stats.controller("NavBarCtrl",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.headerIsCollapsed=true
    });
stats.controller("HomepageShotChartsCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/NBAStatsShotCharts-559380/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.trustAsHtml=$sce.trustAsHtml;
        $scope.data=data.slice(0,3);
        $scope.isLoading=false
        })
    }]);
stats.controller("HomepageThisDayInHistoryCtrl",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/StatsV2History-589801/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data.slice(0,5);
        $scope.isLoading=false
        })
    });
stats.controller("AccordionDemoCtrl",function($scope){
    $scope.oneAtATime=true;
    $scope.status={
        isFirstOpen:true,
        isFirstDisabled:false
    }
});
stats.controller("HomepageBoxScoresCtrl",function($scope,$location,$http,$filter,$timeout,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/StatsV2BoxScores-589802/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data.slice(0,7);
        $scope.isLoading=false
        });
    $scope.months=[{
        value:"1",
        text:"January"
    },{
        value:"2",
        text:"February"
    },{
        value:"3",
        text:"March"
    },{
        value:"4",
        text:"April"
    },{
        value:"5",
        text:"May"
    },{
        value:"6",
        text:"June"
    },{
        value:"7",
        text:"July"
    },{
        value:"8",
        text:"August"
    },{
        value:"9",
        text:"September"
    },{
        value:"10",
        text:"October"
    },{
        value:"11",
        text:"November"
    },{
        value:"12",
        text:"December"
    }];
    $scope.days=[{
        value:"1",
        text:"1"
    },{
        value:"2",
        text:"2"
    },{
        value:"3",
        text:"3"
    },{
        value:"4",
        text:"4"
    },{
        value:"5",
        text:"5"
    },{
        value:"6",
        text:"6"
    },{
        value:"7",
        text:"7"
    },{
        value:"8",
        text:"8"
    },{
        value:"9",
        text:"9"
    },{
        value:"10",
        text:"10"
    },{
        value:"11",
        text:"11"
    },{
        value:"12",
        text:"12"
    },{
        value:"13",
        text:"13"
    },{
        value:"14",
        text:"14"
    },{
        value:"15",
        text:"15"
    },{
        value:"16",
        text:"16"
    },{
        value:"17",
        text:"17"
    },{
        value:"18",
        text:"18"
    },{
        value:"19",
        text:"19"
    },{
        value:"20",
        text:"20"
    },{
        value:"21",
        text:"21"
    },{
        value:"22",
        text:"22"
    },{
        value:"23",
        text:"23"
    },{
        value:"24",
        text:"24"
    },{
        value:"25",
        text:"25"
    },{
        value:"26",
        text:"26"
    },{
        value:"27",
        text:"27"
    },{
        value:"28",
        text:"28"
    },{
        value:"29",
        text:"29"
    },{
        value:"30",
        text:"30"
    },{
        value:"31",
        text:"31"
    }];
    $scope.years=[{
        value:"2014",
        text:"2014"
    },{
        value:"2013",
        text:"2013"
    },{
        value:"2012",
        text:"2012"
    },{
        value:"2011",
        text:"2011"
    },{
        value:"2010",
        text:"2010"
    },{
        value:"2009",
        text:"2009"
    },{
        value:"2008",
        text:"2008"
    },{
        value:"2007",
        text:"2007"
    },{
        value:"2006",
        text:"2006"
    },{
        value:"2005",
        text:"2005"
    },{
        value:"2004",
        text:"2004"
    },{
        value:"2003",
        text:"2003"
    },{
        value:"2002",
        text:"2002"
    },{
        value:"2001",
        text:"2001"
    },{
        value:"2000",
        text:"2000"
    },{
        value:"1999",
        text:"1999"
    },{
        value:"1998",
        text:"1998"
    },{
        value:"1997",
        text:"1997"
    },{
        value:"1996",
        text:"1996"
    },{
        value:"1995",
        text:"1995"
    },{
        value:"1994",
        text:"1994"
    },{
        value:"1993",
        text:"1993"
    },{
        value:"1992",
        text:"1992"
    },{
        value:"1991",
        text:"1991"
    },{
        value:"1990",
        text:"1990"
    },{
        value:"1989",
        text:"1989"
    },{
        value:"1988",
        text:"1988"
    },{
        value:"1987",
        text:"1987"
    },{
        value:"1986",
        text:"1986"
    },{
        value:"1985",
        text:"1985"
    },{
        value:"1984",
        text:"1984"
    },{
        value:"1983",
        text:"1983"
    },{
        value:"1982",
        text:"1982"
    },{
        value:"1981",
        text:"1981"
    },{
        value:"1980",
        text:"1980"
    },{
        value:"1979",
        text:"1979"
    },{
        value:"1978",
        text:"1978"
    },{
        value:"1977",
        text:"1977"
    },{
        value:"1976",
        text:"1976"
    },{
        value:"1975",
        text:"1975"
    },{
        value:"1974",
        text:"1974"
    },{
        value:"1973",
        text:"1973"
    },{
        value:"1972",
        text:"1972"
    },{
        value:"1971",
        text:"1971"
    },{
        value:"1970",
        text:"1970"
    },{
        value:"1969",
        text:"1969"
    },{
        value:"1968",
        text:"1968"
    },{
        value:"1967",
        text:"1967"
    },{
        value:"1966",
        text:"1966"
    },{
        value:"1965",
        text:"1965"
    },{
        value:"1964",
        text:"1964"
    },{
        value:"1963",
        text:"1963"
    },{
        value:"1962",
        text:"1962"
    },{
        value:"1961",
        text:"1961"
    },{
        value:"1960",
        text:"1960"
    },{
        value:"1959",
        text:"1959"
    },{
        value:"1958",
        text:"1958"
    },{
        value:"1957",
        text:"1957"
    },{
        value:"1956",
        text:"1956"
    },{
        value:"1955",
        text:"1955"
    },{
        value:"1954",
        text:"1954"
    },{
        value:"1953",
        text:"1953"
    },{
        value:"1954",
        text:"1954"
    },{
        value:"1952",
        text:"1952"
    },{
        value:"1951",
        text:"1951"
    },{
        value:"1950",
        text:"1950"
    },{
        value:"1949",
        text:"1949"
    },{
        value:"1948",
        text:"1948"
    },{
        value:"1947",
        text:"1947"
    },{
        value:"1946",
        text:"1946"
    },{
        value:"1945",
        text:"1945"
    }];
    $timeout(function(){
        var getMonthValue=$filter("date")(new Date,"M");
        var getDayValue=$filter("date")(new Date,"d");
        var getYearValue=$filter("date")(new Date,"yyyy");
        $("#box-score-month option").filter('[value="'+getMonthValue+'"]').prop("selected",true);
        $("#box-score-day option").filter('[value="'+getDayValue+'"]').prop("selected",true);
        $("#box-score-year option").filter('[value="'+getYearValue+'"]').prop("selected",true)
        },100);
    $scope.submit=function(){
        var getSelectedMonth=$("#box-score-month option:selected").val();
        var getSelectedDay=$("#box-score-day option:selected").val();
        var getSelectedYear=$("#box-score-year option:selected").val();
        var url="";
        var url="/scores/#!/"+getSelectedMonth+"/"+getSelectedDay+"/"+getSelectedYear;
        location.href=url
        }
    });
stats.controller("HomepageLeadersCtrl",function($scope,$timeout,SEASON_CONFIG,StatsRequest,$http,$q,Splits,$location){
    "use strict";
    $scope.currentIndex=0;
    $scope.changePanel=function(direction){
        if($scope.currentIndex+direction<8&&$scope.currentIndex+direction>0){
            $scope.currentIndex+=direction
            }else{
            if($scope.currentIndex+direction<0){
                $scope.currentIndex=7
                }else $scope.currentIndex=0
                }
            };

$scope.showSplits=false;
$scope.altStatsLoaded=false;
$scope.panelsShown=4;
$scope.moreShown=false;
$scope.statTypeModel="Traditional";
$scope.gameScopeModel="Season";
$scope.playOrTeamModel="Player";
$scope.seasonTypeModel="Regular Season";
$scope.seasonModel="2013-14";
$scope.params={
    Season:SEASON_CONFIG.homepageLeaders.Season,
    SeasonType:SEASON_CONFIG.homepageLeaders.SeasonType,
    LeagueID:"00",
    PlayerOrTeam:"Player",
    GameScope:"Season",
    StatType:"Traditional",
    PlayerScope:"All Players"
};

$scope.status={
    isOpenOne:false,
    isOpenTwo:false,
    isOpenThree:false,
    isLoading:true,
    moreShown:false
};

$scope.splits=Splits.get([{
    name:"Season",
    initial:SEASON_CONFIG.leadersAllTime.Season,
    seasonRange:[SEASON_CONFIG.leadersAllTime.SeasonYearFrom,SEASON_CONFIG.leadersAllTime.SeasonYear]
    },{
    name:"SeasonType",
    without:["Preseason"],
    initial:SEASON_CONFIG.leadersAllTime.SeasonType
    },"PerMode","StatCategory","Scope"]);
$scope.navButtons={
    StatType:{
        displayName:$scope.statTypeModel,
        dropDown:["Advanced","Traditional"]
        },
    PlayerTracker:{
        displayName:"Player Tracker"
    },
    GameScope:{
        displayName:$scope.gameScopeModel,
        dropDown:["Season","Last 10","Yesterday"]
        },
    PlayerScope:{
        displayName:$scope.playerScopeModel,
        dropDown:["All Players","Rookies"]
        },
    PlayerOrTeam:{
        displayName:$scope.playOrTeamModel,
        dropDown:["Player","Team"]
        }
    };

var categories={
    Traditional:[{
        display:"Points Per Game",
        stat:"PTS",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Points - The number of points a player or team has scored. A point is scored when a player makes a basket."
    },{
        display:"Rebounds Per Game",
        stat:"REB",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Rebounds - A rebound occurs when a player recovers the ball after a missed shot. This statistic is the number of total rebounds a player or team has collected on either offense or defense."
    },{
        display:"Assists Per Game",
        stat:"AST",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Assists - An assist occurs when a player completes a pass to a teammate that directly leads to a made field goal."
    },{
        display:"Steals Per Game",
        stat:"STL",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Steals - A steal occurs when a defensive player takes the ball from a player on offense, causing a turnover."
    },{
        display:"Field Goal %",
        stat:"FG_PCT",
        isShown:false,
        format:"percent",
        toolText:"Field Goal Percentage - The percentage of field goals that a player makes. The formula to determine field goal percentage is: Field Goals Made/Field Goals Attempted."
    },{
        display:"Free Throw %",
        stat:"FT_PCT",
        isShown:false,
        format:"percent",
        toolText:"Free Throw Percentage - The percentage of free throws that a player or team has made. The formula to determine free throw percentage is: Free Throws Made/Free Throws Attempted."
    },{
        display:"Three Point %",
        stat:"FG3_PCT",
        isShown:false,
        format:"percent",
        toolText:"3 Point Field Goal Percentage - The percentage of 3 point field goals that a player or team has made. The formula to determine 3 point field goal percentage is: 3 Point Field Goals Made/3 Point Field Goals Attempted."
    },{
        display:"Blocks Per Game",
        stat:"BLK",
        isShown:false,
        format:"number",
        param:1,
        toolText:"Blocks - A block occurs when an offensive player attempts a shot, and the defense player tips the ball, blocking their chance to score."
    }],
    Advanced:[{
        display:"OFF Rtg",
        stat:"OFF_RATING",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Offensive Rating - The number of points scored per 100 possessions by a team. For a player, it is the number of points per 100 possessions that the team scores while that individual player is on the court."
    },{
        display:"DEF Rtg",
        stat:"DEF_RATING",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Defensive Rating - The number of points allowed per 100 possessions by a team. For a player, it is the number of points per 100 possessions that the team allows while that individual player is on the court."
    },{
        display:"NET Rtg",
        stat:"NET_RATING",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Net Rating - Net Rating is the difference in a player or team's Offensive and Defensive Rating. The formula for this is: Offensive Rating - Defensive Rating"
    },{
        display:"PIE",
        stat:"PIE",
        isShown:true,
        format:"percent",
        toolText:"Player Impact Estimate - PIE is an estimate of a player's or team's contributions and impact on a game. PIE shows what % of game events did that player or team achieve."
    },{
        display:"REB%",
        stat:"REB_PCT",
        isShown:false,
        format:"percent",
        toolText:"Rebound Percentage - The percentage of total rebounds a player obtains while on the court."
    },{
        display:"AST%",
        stat:"AST_PCT",
        isShown:false,
        format:"percent",
        toolText:"Assist Percentage - Assist Percentage is the percent of teammate's field goals that the player assisted."
    },{
        display:"TS%",
        stat:"TS_PCT",
        isShown:false,
        format:"percent",
        toolText:"True Shooting Percentage - A shooting percentage that is adjusted to include the value three pointers and free throws. The formula is: Points/ [2*(Field Goals Attempted+0.44*Free Throws Attempted)]"
    },{
        display:"EFG%",
        stat:"EFG_PCT",
        isShown:false,
        format:"percent",
        toolText:"Effective Field Goal Percentage - Effective Field Goal Percentage is a field goal percentage that is adjusted for made 3 pointers being 1.5 times more valuable than a 2 point shot."
    }],
    Advanced_TM:[{
        display:"OFF Rtg",
        stat:"OFF_RATING",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Offensive Rating - The number of points scored per 100 possessions by a team. For a player, it is the number of points per 100 possessions that the team scores while that individual player is on the court."
    },{
        display:"DEF Rtg",
        stat:"DEF_RATING",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Defensive Rating - The number of points allowed per 100 possessions by a team. For a player, it is the number of points per 100 possessions that the team allows while that individual player is on the court."
    },{
        display:"NET Rtg",
        stat:"NET_RATING",
        isShown:true,
        format:"number",
        param:1,
        toolText:"Net Rating - Net Rating is the difference in a player or team's Offensive and Defensive Rating. The formula for this is: Offensive Rating - Defensive Rating"
    },{
        display:"PIE",
        stat:"TM_PIE",
        isShown:true,
        format:"percent",
        toolText:"Player Impact Estimate - PIE is an estimate of a player's or team's contributions and impact on a game. PIE shows what % of game events did that player or team achieve."
    },{
        display:"REB%",
        stat:"TM_REB_PCT",
        isShown:false,
        format:"percent",
        toolText:"Rebound Percentage - The percentage of total rebounds a player obtains while on the court."
    },{
        display:"AST%",
        stat:"TM_AST_PCT",
        isShown:false,
        format:"percent",
        toolText:"Assist Percentage - Assist Percentage is the percent of teammate's field goals that the player assisted."
    },{
        display:"TS%",
        stat:"TS_PCT",
        isShown:false,
        format:"percent",
        toolText:"True Shooting Percentage - A shooting percentage that is adjusted to include the value three pointers and free throws. The formula is: Points/ [2*(Field Goals Attempted+0.44*Free Throws Attempted)]"
    },{
        display:"EFG%",
        stat:"TM_EFG_PCT",
        isShown:false,
        format:"percent",
        toolText:"Effective Field Goal Percentage - Effective Field Goal Percentage is a field goal percentage that is adjusted for made 3 pointers being 1.5 times more valuable than a 2 point shot."
    }]
    };

$scope.statView=$scope.params.StatType;
function getStats(){
    $scope.status.isLoading=true;
    $scope.status.isOpenOne=false;
    $scope.status.isOpenTwo=false;
    $scope.status.isOpenThree=false;
    $scope.status.isOpenFour=false;
    $scope.status.isOpenFive=false;
    $scope.status.isOpenSix=false;
    $scope.altStatsLoaded=false;
    StatsRequest.get("homepageLeaders2","",$scope.params).then(function(){
        $scope.otherStats=[];
        var cats=$scope.params.PlayerOrTeam==="Team"&&$scope.params.StatType==="Advanced"?categories["Advanced_TM"]:categories[$scope.params.StatType];
        var data=StatsRequest.getResults();
        for(var i in cats){
            cats[i].datatable=data[i].datatable
            }
            $scope.datasets=cats;
        if($scope.moreShown){
            $scope.showMore()
            }
            if($scope.params.StatType!="Advanced"&&$location.absUrl().indexOf("seasontiles")>1){
            for(var j=0,len=$scope.datasets.length;j<len;j++){
                $scope.otherStats[j]=$http.get("/stats/leaderstiles?Season="+$scope.params.Season+"&SeasonType="+$scope.params.SeasonType.replace(" ","+")+"&LeagueID=00&Stat="+$scope.datasets[j].stat+"&PlayerOrTeam="+$scope.params.PlayerOrTeam+"&GameScope="+$scope.params.GameScope+"&PlayerScope="+$scope.params.PlayerScope)
                }
                $q.all($scope.otherStats).then(function(resp){
                $scope.altStatsLoaded=true;
                for(var k=0,len2=resp.length;k<len2;k++){
                    $scope.otherStats[k]=resp[k].data.resultSet
                    }
                    $scope.altStatsLoaded=true;
                $scope.status.isLoading=false
                })
            }else{
            $scope.otherStats=[];
            $scope.status.isLoading=false
            }
            $scope.seasonType=$scope.params.SeasonType
        })
    }
    $scope.onrunit=function(){
    getStats()
    };

$scope.setStatType=function(val){
    if(val===$scope.params.StatType||$scope.isLoading){
        return
    }
    $scope.params.StatType=val;
    getStats()
    };

$scope.setPlayerOrTeam=function(val){
    $scope.params.PlayerOrTeam=val;
    getStats()
    };

$scope.setGameScope=function(val){
    $scope.params.GameScope=val;
    getStats()
    };

$scope.setPlayerScope=function(val){
    $scope.params.PlayerScope=val;
    getStats()
    };

$scope.setSeason=function(val){
    $scope.params.Season=val;
    getStats()
    };

$scope.setSeasonType=function(val){
    $scope.params.SeasonType=val;
    getStats()
    };

$scope.showMore=function(){
    $scope.moreShown=true
    };

$scope.showLess=function(){
    $scope.moreShown=false
    };

$scope.switchToTeam=function(){
    $scope.params.PlayerOrTeam="Team";
    getStats()
    };

$scope.switchToPlayer=function(){
    $scope.params.PlayerOrTeam="Player";
    getStats()
    };

getStats()
    });
stats.controller("HomepageOtherNewsCtrl",function($scope,$location,$http,TEAMS){
    "use strict";
    $scope.isLoading=true;
    $http({
        method:"GET",
        url:"/feeds/StatsV2OtherNews-589789/json.js"
    }).then(function(response){
        var data=response.data.ListItems;
        $scope.data=data.slice(0,12);
        $scope.message=" this is from the other news controller";
        $scope.isLoading=false
        })
    });
stats.controller("HomepagePlayerListCtrl",function($scope,$timeout,SEASON_CONFIG,StatsRequest){
    "use strict"
    });
stats.controller("LeagueAllTimeLeadersCtrl",["$scope","Splits","SEASON_CONFIG","LeagueLeadersService",function($scope,Splits,SEASON_CONFIG,LeagueLeadersService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"SeasonType",
        without:"Preseason",
        initial:SEASON_CONFIG.trackingStats.SeasonType
        },"PerMode",{
        name:"StatCategory",
        without:["AST_TOV","STL_TOV","PF","EFF"]
        }]);
    $scope.params={
        LeagueID:"00",
        Season:"All Time",
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        StatCategory:$scope.splits.StatCategory.selected.val,
        Scope:"S"
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLeadersService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLeadersCtrl",["$scope","Splits","SEASON_CONFIG","LeagueLeadersService",function($scope,Splits,SEASON_CONFIG,LeagueLeadersService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leadersAllTime.Season,
        seasonRange:[SEASON_CONFIG.leadersAllTime.SeasonYearFrom,SEASON_CONFIG.leadersAllTime.SeasonYear]
        },{
        name:"SeasonType",
        without:"Preseason",
        include:[{
            text:"Preseason",
            val:"Pre Season"
        }],
        initial:SEASON_CONFIG.leadersAllTime.SeasonType
        },{
        name:"PerMode",
        include:[{
            val:"Per48",
            text:"Per 48 Minutes"
        }]
        },"Scope"]);
    var categories={
        Per48:Splits.get([{
            name:"StatCategory",
            without:["MIN","FG_PCT","FG3_PCT","FT_PCT","AST_TOV","STL_TOV"]
            }]).StatCategory,
        PerGame:Splits.get([{
            name:"StatCategory",
            without:["FGA","FGM","FG_PCT","FG3M","FG3A","FG3_PCT","FTA","FTM","FT_PCT","PF","AST_TOV","STL_TOV"]
            }]).StatCategory,
        Totals:Splits.get([{
            name:"StatCategory"
        }]).StatCategory
        };

    $scope.splits.StatCategory=categories[$scope.splits.PerMode.selected.val];
    $scope.params={
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        StatCategory:$scope.splits.StatCategory.selected.val,
        Scope:$scope.splits.Scope.selected.val
        };

    $scope.$watch("splits.PerMode.selected",function(selected){
        $scope.splits.StatCategory=categories[selected.val]
        });
    function getStats(){
        $scope.isLoading=true;
        LeagueLeadersService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLineupsAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueLineupsService",function($scope,$location,Splits,SEASON_CONFIG,LeagueLineupsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueLineups.Season,
        seasonRange:[SEASON_CONFIG.leagueLineups.SeasonYearFrom,SEASON_CONFIG.leagueLineups.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueLineups.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
    $scope.params={
        MeasureType:"Advanced",
        LeagueID:"00",
        GroupQuantity:$scope.splits.GroupQuantity.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:"",
        GameID:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLineupsService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLineupsBaseCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueLineupsService",function($scope,$location,Splits,SEASON_CONFIG,LeagueLineupsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueLineups.Season,
        seasonRange:[SEASON_CONFIG.leagueLineups.SeasonYearFrom,SEASON_CONFIG.leagueLineups.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueLineups.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        GroupQuantity:$scope.splits.GroupQuantity.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:"",
        GameID:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLineupsService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLineupsFourFactorsCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueLineupsService",function($scope,$location,Splits,SEASON_CONFIG,LeagueLineupsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueLineups.Season,
        seasonRange:[SEASON_CONFIG.leagueLineups.SeasonYearFrom,SEASON_CONFIG.leagueLineups.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueLineups.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
    $scope.params={
        MeasureType:"Four Factors",
        LeagueID:"00",
        GroupQuantity:$scope.splits.GroupQuantity.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:"",
        GameID:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLineupsService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLineupsMiscCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueLineupsService",function($scope,$location,Splits,SEASON_CONFIG,LeagueLineupsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueLineups.Season,
        seasonRange:[SEASON_CONFIG.leagueLineups.SeasonYearFrom,SEASON_CONFIG.leagueLineups.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueLineups.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
    $scope.params={
        MeasureType:"Misc",
        LeagueID:"00",
        GroupQuantity:$scope.splits.GroupQuantity.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:"",
        GameID:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLineupsService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLineupsNavCtrl",["$scope","$location","$route",function($scope,$location,$route){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"traditional",
        path:"",
        text:"Traditional"
    },{
        page:"advanced",
        path:"advanced",
        text:"Advanced"
    },{
        page:"fourfactors",
        path:"fourfactors",
        text:"Four Factors"
    },{
        page:"misc",
        path:"misc",
        text:"Misc"
    },{
        page:"scoring",
        path:"scoring",
        text:"Scoring"
    },{
        page:"opponent",
        path:"opponent",
        text:"Opponent"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.selected.path)
        }
    }]);
stats.controller("LeagueLineupsOpponentCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueLineupsService",function($scope,$location,Splits,SEASON_CONFIG,LeagueLineupsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueLineups.Season,
        seasonRange:[SEASON_CONFIG.leagueLineups.SeasonYearFrom,SEASON_CONFIG.leagueLineups.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueLineups.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
    $scope.params={
        MeasureType:"Opponent",
        LeagueID:"00",
        GroupQuantity:$scope.splits.GroupQuantity.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:"",
        GameID:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLineupsService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueLineupsScoringCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueLineupsService",function($scope,$location,Splits,SEASON_CONFIG,LeagueLineupsService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueLineups.Season,
        seasonRange:[SEASON_CONFIG.leagueLineups.SeasonYearFrom,SEASON_CONFIG.leagueLineups.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueLineups.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
    $scope.params={
        MeasureType:"Scoring",
        LeagueID:"00",
        GroupQuantity:$scope.splits.GroupQuantity.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:"",
        GameID:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueLineupsService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerClutchAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","Rank","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Advanced",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"Totals",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerClutchBaseCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerClutchMiscCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Misc",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerClutchScoringCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Scoring",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"PerGame",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerClutchUsageCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Usage",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"Totals",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerGeneralAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","Rank","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Advanced",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"Totals",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerGeneralBaseCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank","DateFrom","DateTo"]);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:$scope.splits.DateFrom.selected.val,
        DateTo:$scope.splits.DateTo.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerGeneralMiscCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Misc",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerGeneralScoringCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Scoring",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"PerGame",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerGeneralUsageCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Usage",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"Totals",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerNavCtrl",["$scope","$location","$route",function($scope,$location,$route){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"generalTraditional",
        path:"",
        text:"General Traditional"
    },{
        page:"generalAdvanced",
        path:"advanced",
        text:"General Advanced"
    },{
        page:"generalMisc",
        path:"misc",
        text:"General Misc"
    },{
        page:"generalScoring",
        path:"scoring",
        text:"General Scoring"
    },{
        page:"generalUsage",
        path:"usage",
        text:"General Usage"
    },{
        page:"clutchTraditional",
        path:"clutch/",
        text:"Clutch Traditional"
    },{
        page:"clutchAdvanced",
        path:"clutch/advanced",
        text:"Clutch Advanced"
    },{
        page:"clutchMisc",
        path:"clutch/misc",
        text:"Clutch Misc"
    },{
        page:"clutchScoring",
        path:"clutch/scoring",
        text:"Clutch Scoring"
    },{
        page:"clutchUsage",
        path:"clutch/usage",
        text:"Clutch Usage"
    },{
        page:"shooting",
        path:"shooting",
        text:"Shooting"
    },{
        page:"oppshooting",
        path:"oppshooting",
        text:"Opponent Shooting"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.selected.path)
        }
    }]);
stats.controller("LeaguePlayerOppShootingCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerShootingService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerShootingService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"PerMode","DistanceRange","GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank","GameScope","DateFrom","DateTo"]);
    $scope.params={
        MeasureType:"Opponent",
        LeagueID:"00",
        DistanceRange:$scope.splits.DistanceRange.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        GameScope:$scope.splits.GameScope.selected.val,
        DateFrom:$scope.splits.DateFrom.selected.val,
        DateTo:$scope.splits.DateTo.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerShootingService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeaguePlayerShootingCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeaguePlayerShootingService",function($scope,$location,Splits,SEASON_CONFIG,LeaguePlayerShootingService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:[SEASON_CONFIG.leaguePlayerStats.SeasonYearFrom,SEASON_CONFIG.leaguePlayerStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leaguePlayerStats.SeasonType,
        without:["Preseason"]
        },"PerMode","DistanceRange","GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank","GameScope","DateFrom","DateTo"]);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        DistanceRange:$scope.splits.DistanceRange.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        GameScope:$scope.splits.GameScope.selected.val,
        DateFrom:$scope.splits.DateFrom.selected.val,
        DateTo:$scope.splits.DateTo.selected.val
        };

    function getStats(){
        $scope.isLoading=true;
        LeaguePlayerShootingService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamClutchAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","Rank","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Advanced",
        LeagueID:"00",
        PerMode:"Totals",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamClutchBaseCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamClutchFourFactorsCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Four Factors",
        LeagueID:"00",
        PerMode:"Totals",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamClutchMiscCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Misc",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamClutchOpponentCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Opponent",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamClutchScoringCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamClutchService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamClutchService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","ClutchTime","AheadBehind","PointDiff","PaceAdjust"]);
    $scope.params={
        MeasureType:"Scoring",
        LeagueID:"00",
        PerMode:"PerGame",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        ClutchTime:$scope.splits.ClutchTime.selected.val,
        AheadBehind:$scope.splits.AheadBehind.selected.val,
        PointDiff:$scope.splits.PointDiff.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamClutchService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamGeneralAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","Rank","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Advanced",
        LeagueID:"00",
        PerMode:"Totals",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamGeneralBaseCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamGeneralFourFactorsCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Four Factors",
        LeagueID:"00",
        PerMode:"Totals",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamGeneralMiscCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Misc",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamGeneralOpponentCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Opponent",
        LeagueID:"00",
        PerMode:$scope.splits.PerMode.selected.val,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamGeneralScoringCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamGeneralService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamGeneralService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust","Rank"]);
    $scope.params={
        MeasureType:"Scoring",
        LeagueID:"00",
        PerMode:"PerGame",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamGeneralService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamNavCtrl",["$scope","$location","$route",function($scope,$location,$route){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"generalTraditional",
        path:"",
        text:"General Traditional"
    },{
        page:"generalAdvanced",
        path:"advanced",
        text:"General Advanced"
    },{
        page:"generalMisc",
        path:"misc",
        text:"General Misc"
    },{
        page:"generalFourFactors",
        path:"misc",
        text:"General Four Factors"
    },{
        page:"generalScoring",
        path:"scoring",
        text:"General Scoring"
    },{
        page:"generalOpponent",
        path:"opponent",
        text:"General Opponent"
    },{
        page:"clutchTraditional",
        path:"clutch/",
        text:"Clutch Traditional"
    },{
        page:"clutchAdvanced",
        path:"clutch/advanced",
        text:"Clutch Advanced"
    },{
        page:"clutchFourFactors",
        path:"clutch/fourfactors",
        text:"Clutch Four Factors"
    },{
        page:"clutchMisc",
        path:"clutch/misc",
        text:"Clutch Misc"
    },{
        page:"clutchScoring",
        path:"clutch/scoring",
        text:"Clutch Scoring"
    },{
        page:"clutchOpponent",
        path:"clutch/opponent",
        text:"Clutch Opponent"
    },{
        page:"shooting",
        path:"shooting",
        text:"Shooting"
    },{
        page:"oppshooting",
        path:"oppshooting",
        text:"Opponent Shooting"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.selected.path)
        }
    }]);
stats.controller("LeagueTeamOppShootingCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamShootingService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamShootingService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"PerMode","DistanceRange","GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust"]);
    $scope.params={
        MeasureType:"Opponent",
        DistanceRange:$scope.splits.DistanceRange.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamShootingService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("LeagueTeamShootingCtrl",["$scope","$location","Splits","SEASON_CONFIG","LeagueTeamShootingService",function($scope,$location,Splits,SEASON_CONFIG,LeagueTeamShootingService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.splits=Splits.get([{
        name:"Season",
        initial:SEASON_CONFIG.leagueTeamStats.Season,
        seasonRange:[SEASON_CONFIG.leagueTeamStats.SeasonYearFrom,SEASON_CONFIG.leagueTeamStats.SeasonYear]
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.leagueTeamStats.SeasonType,
        without:["Preseason"]
        },"PerMode","DistanceRange","GameSegment","Period","PlayerPosition","StarterBench","PlayerExperience","OpponentTeamID","VsConference","VsDivision","Outcome","Location","SeasonSegment","Month","LastNGames","PlusMinus","PaceAdjust"]);
    $scope.params={
        MeasureType:"Base",
        DistanceRange:$scope.splits.DistanceRange.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        PlayerExperience:$scope.splits.PlayerExperience.selected.val,
        PlayerPosition:$scope.splits.PlayerPosition.selected.val,
        StarterBench:$scope.splits.StarterBench.selected.val,
        Rank:"N",
        GameScope:"",
        DateFrom:"",
        DateTo:""
    };

    function getStats(){
        $scope.isLoading=true;
        LeagueTeamShootingService.get($scope.params).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    getStats()
    }]);
stats.controller("GamedateCalendarCtrl",["$scope","$location","$filter",function NavbarCtrl($scope,$location,$filter){
    "use strict";
    $scope.showCal=false;
    $scope.dt=$location.path().slice(1);
    $scope.format="dd/MM/yyyy";
    function setDate(adj){
        var date=new Date($scope.gameDate);
        date.setDate(date.getDate()+adj);
        var urlDate=$filter("date")(date,"MM/dd/yyyy");
        $location.path(urlDate)
        }
        $scope.changeDate=function(direction){
        switch(direction){
            case"next":
                setDate(1);
                break;
            case"prev":
                setDate(-1);
                break;
            default:
                setDate(1)
                }
            };

$scope.$watch("dt",function(newval,oldval){
    var urlDate=$filter("date")($scope.dt,"MM/dd/yyyy");
    $scope.gameDate=urlDate;
    $location.path(urlDate)
    });
$scope.$watch(function(){
    return $location.path()
    },function(){
    if($location.path().slice(1)){
        $scope.gameDate=$location.path().slice(1)
        }else{
        var date=new Date;
        var urlDate=$filter("date")(date,"MM/dd/yyyy");
        $location.path(urlDate)
        }
    })
}]);
stats.controller("ModalInstanceCtrl",["$scope","$sce","$window","$location","SocialService","$modalInstance","url","title","type",function($scope,$sce,$window,$location,SocialService,$modalInstance,url,title,type){
    "use strict";
    $scope.trustAsResourceUrl=$sce.trustAsResourceUrl;
    $scope.trustAsHtml=$sce.trustAsHtml;
    $scope.url=url;
    $scope.title=title;
    $scope.close=function(){
        $modalInstance.close("closed")
        };

    $scope.openWindow=function($e){
        $e.stopPropagation();
        $e.preventDefault();
        var href=$e.currentTarget.href;
        $window.open(href,"Stats","resizable=yes,scrollbars=yes,height=300,width=600")
        };

    var location=$location.absUrl();
    var params=url.split("?")[1];
    var appender=location.indexOf("?")>-1?"&":"?";
    var modaltype="&mtype="+type;
    var modaltitle="&mtitle="+title;
    location+=appender+params+modaltype+modaltitle;
    var longUrl=encodeURIComponent(location);
    SocialService.getLinks(longUrl,title).then(function(shortUrl){
        $scope.shortUrl=shortUrl
        })
    }]);
stats.controller("NavbarCtrl",["$scope","$location",function NavbarCtrl($scope,$location){
    "use strict";
    $scope.navDrop=false;
    $scope.dropNav=function(){
        if($scope.navDrop===true){
            $scope.navDrop=false
            }else{
            $scope.navDrop=true
            }
        }
}]);
stats.controller("StatTableCtrl",["$scope","$element","$filter","$location",function($scope,$element,$filter,$location){
    "use strict";
    var unfiltered=$scope.dataset.datatable.slice(0);
    $scope.rows=applyFilters(unfiltered,$scope.filters);
    if($scope.dataset.datafooter){
        $scope.footer=$scope.dataset.datafooter
        }
        $scope.totalRows=$scope.rows.length;
    $scope.rowsPerPage=$scope.rowsPerPage||50;
    $scope.currentPage=1;
    $scope.totalPages=Math.ceil($scope.totalRows/$scope.rowsPerPage);
    $scope.navHeader=false;
    $scope.descending=true;
    $scope.column="";
    var updateDataset=function(e){
        $scope.currentPage=1;
        var unfiltered=$scope.dataset.datatable.slice(0);
        $scope.rows=applyFilters(unfiltered,$scope.filters);
        $scope.totalRows=$scope.rows.length;
        $scope.rowsPerPage=$scope.rowsPerPage||50;
        $scope.totalPages=Math.ceil($scope.totalRows/$scope.rowsPerPage);
        $scope.column="";
        $element.find("th.sortable").removeClass("sorted");
        var initialSortField=$location.search().sort;
        if(initialSortField){
            sortColumn(initialSortField,false)
            }
            pageChange()
        };

    var sortColumn=function(column,apply){
        if($scope.column==column){
            $scope.descending=!$scope.descending
            }else{
            $scope.column=column;
            $scope.descending=true
            }
            $scope.rows.sort(sortfunc);
        var selector='th[field="'+column+'"]';
        var $elm=$element.find(selector);
        $elm.siblings().removeClass("sorted").end().addClass("sorted");
        $scope.currentPage=1;
        pageChange();
        if(apply){
            $scope.$apply()
            }
        };

var sortfunc=function(a,b){
    if($scope.descending){
        if(a[$scope.column]>b[$scope.column]){
            return-1
            }else if(a[$scope.column]<b[$scope.column]){
            return 1
            }else{
            return 0
            }
        }else{
    if(b[$scope.column]>a[$scope.column]){
        return-1
        }else if(b[$scope.column]<a[$scope.column]){
        return 1
        }else{
        return 0
        }
    }
};

var prevPage=function(e){
    if($scope.currentPage==1){
        return
    }
    $scope.currentPage-=1;
    $scope.$apply()
    };

var nextPage=function(e){
    if($scope.currentPage==$scope.totalPages){
        return
    }
    $scope.currentPage+=1;
    $scope.$apply()
    };

var pageChange=function(e){
    var alpha=($scope.currentPage-1)*$scope.rowsPerPage;
    var omega=alpha+$scope.rowsPerPage;
    $scope.page=$scope.rows.slice(alpha,omega)
    };

var setFilters=function(e){
    updateDataset()
    };

$scope.$watch("dataset",updateDataset);
$scope.$watch("currentPage",pageChange);
$scope.$watch("filters",setFilters);
$scope.$on("changeSortColumn",function(event,column){
    sortColumn(column,false)
    });
$element.on("click",".page-nav.left",prevPage);
$element.on("click",".page-nav.right",nextPage);
$element.on("click","th.sortable",function(e){
    var column=$(this).attr("field");
    sortColumn(column,true)
    });
var cfs=[];
$element.find(".cf").each(function(i,n){
    var $n=angular.element(n);
    var name=$n.attr("field");
    var text=$n.hasClass("grouped")?$n.attr("field"):$n.text();
    cfs.push({
        name:name,
        text:text
    })
    });
$scope.$emit("customFields",cfs);
function applyFilters(rows,filters){
    if(!filters){
        return rows
        }
        for(var i in filters){
        rows=$filter("customStatFilter")(rows,filters[i].value)
        }
        return rows
    }
}]);
stats.controller("MovementCtrl",["$scope","$rootScope","$location","$element","$http","$filter",function($scope,$rootScope,$location,$element,$http,$filter){
    var animationFrame;
    var momentIndex=0;
    var data;
    var players={};

    var teams={};

    var teamkeys=["home","visitor"];
    var xMin=0;
    var xMax=75;
    $scope.isPlaying=false;
    $scope.isLoading=true;
    $scope.noData=false;
    $scope.court={
        margin:{
            top:15,
            right:30,
            bottom:15,
            left:30
        },
        width:940,
        height:500,
        rotation:40
    };

    $scope.playbackSpeeds=[{
        ms:160,
        text:".25x"
    },{
        ms:80,
        text:".5x"
    },{
        ms:40,
        text:"1x"
    },{
        ms:20,
        text:"2x"
    },{
        ms:10,
        text:"4x"
    }];
    $scope.playbackSpeed=$scope.playbackSpeeds[2];
    $scope.svg={
        elm:$element.find("svg"),
        width:$scope.court.width+$scope.court.margin.left+$scope.court.margin.right,
        height:$scope.court.height+$scope.court.margin.top+$scope.court.margin.bottom
        };

    $scope.svg.aspect=$scope.svg.height/$scope.svg.width;
    $scope.vtm={
        players:[],
        hideCoverage:false
    };

    $scope.htm={
        players:[],
        hideCoverage:false
    };

    $scope.ball={};

    function parseData(data){
        for(var i in teamkeys){
            var key=teamkeys[i];
            var team=data[key];
            var teamid=team.teamid;
            teams[teamid]=team;
            teams[teamid].type=key;
            for(var j in team.players){
                var player=team.players[j];
                var playerid=player.playerid;
                players[playerid]=player;
                player.name=player.firstname+" "+player.lastname;
                player.teamid=team.teamid;
                player.teamname=team.name;
                player.teamtype=team.type
                }
            }
            $scope.htm.team=data.home;
    $scope.vtm.team=data.visitor
    }
    function parseMoment(moment){
    var i;
    var info={
        period:moment[0],
        timestamp:moment[1],
        gameclock:moment[2],
        shotclock:moment[3],
        eventid:moment[4]
        };

    var ps=moment[5].map(function(n,i){
        var obj={
            teamid:n[0],
            playerid:n[1],
            x:n[2]*10,
            y:n[3]*10,
            z:n[4]*10,
            hide:false
        };

        return obj
        });
    var obj={
        info:info,
        ball:ps[0],
        htm:ps.slice(1,6),
        vtm:ps.slice(6,11)
        };

    for(i in obj.vtm){
        obj.vtm[i].info=players[obj.vtm[i].playerid]
        }
        for(i in obj.htm){
        obj.htm[i].info=players[obj.htm[i].playerid]
        }
        return obj
    }
    function getTeamHull(d){
    return d3.geom.hull(d.map(function(i){
        return[i.x,i.y]
        }))
    }
    function getBallRadius(z){
    var r=z*.2;
    r=Math.min(Math.max(r,10),18);
    return r
    }
    function setTeamPlayerData(team,loc){
    if($scope[loc].players.length!=team.length){
        $scope[loc].players=team;
        return
    }else{
        for(var i in team){
            var p=$scope[loc].players[i];
            var m=team[i];
            if(p&&p.playerid==m.playerid){
                p.x=m.x;
                p.y=m.y
                }else{
                $scope[loc].players[i]=m
                }
            }
        }
        var visible=$filter("filter")($scope[loc].players,{
    hide:false
});
$scope[loc].hull=getTeamHull(visible);
    $scope[loc].path="M"+$scope[loc].hull.join("L")+"Z";
    $scope[loc].area=d3.geom.polygon($scope[loc].hull).area();
    $scope[loc].coverage=$scope[loc].area/2350
    }
    function onFrame(dontApply){
    var moment=parseMoment(data.moments[momentIndex]);
    $scope.court.period=moment.info.period;
    $scope.court.gameclock=moment.info.gameclock;
    $scope.court.shotclock=moment.info.shotclock;
    setTeamPlayerData(moment.htm,"htm");
    setTeamPlayerData(moment.vtm,"vtm");
    $scope.ball.x=moment.ball.x;
    $scope.ball.y=moment.ball.y;
    $scope.ball.r=getBallRadius(moment.ball.z);
    if(!dontApply){
        $scope.$apply()
        }
        momentIndex+=1;
    if(momentIndex>=data.moments.length){
        $scope.pause();
        broadcastFinished()
        }
    }
function broadcastFinished(){
    $scope.stop();
    $scope.$emit("finishedPlaying")
    }
    $scope.rewind=function(){
    momentIndex=0;
    clearInterval(animationFrame);
    onFrame(true)
    };

$scope.forward=function(){
    momentIndex=data.moments.length-1;
    clearInterval(animationFrame);
    onFrame(true)
    };

$scope.pause=function(){
    $scope.isPlaying=false;
    clearInterval(animationFrame);
    return false
    };

$scope.stop=function(){
    $scope.isPlaying=false;
    momentIndex=0;
    clearInterval(animationFrame);
    return false
    };

$scope.play=function(){
    $scope.isPlaying=true;
    if(momentIndex==data.moments.length){
        momentIndex=0
        }
        clearInterval(animationFrame);
    animationFrame=setInterval(onFrame,$scope.playbackSpeed.ms);
    return false
    };

$scope.stepbackward=function(){
    momentIndex=momentIndex>0?momentIndex-2:momentIndex;
    if(momentIndex<0){
        momentIndex=0
        }
        clearInterval(animationFrame);
    onFrame(true)
    };

$scope.stepforward=function(){
    momentIndex=momentIndex<data.moments.length-1?momentIndex+1:data.moments.length-1;
    clearInterval(animationFrame);
    onFrame(true)
    };

$scope.getFeed=function(params){
    var url="/stats/locations_getmoments/";
    $scope.isLoading=true;
    momentIndex=0;
    $http({
        method:"GET",
        url:url,
        params:params
    }).success(function(response,status){
        data=response;
        if(data.moments.length===0){
            console.log("no data in momments array",params);
            $scope.noData=true;
            $scope.isLoading=false;
            broadcastFinished();
            return
        }
        parseData(data);
        $scope.isLoading=false;
        momentIndex=0;
        $scope.play();
        setTimeout(onResize,100)
        }).error(function(response,status){
        console.log("error",response,status);
        $scope.noData=true;
        $scope.isLoading=false;
        broadcastFinished()
        })
    };

$scope.$watch("selectedItem",function(item){
    if(!item||!item.ei||!item.gi){
        return
    }
    $scope.description=item.dsc;
    var params={
        gameid:item.gi,
        eventid:item.ei
        };

    $scope.getFeed(params)
    });
if($location.search().GameEventID){
    var params={
        gameid:$location.search().GameID,
        eventid:$location.search().GameEventID
        };

    $scope.getFeed(params)
    }
    var onResize=function(){
    var width=$scope.svg.elm.width();
    $scope.svg.elm.attr("width",width);
    $scope.svg.elm.attr("height",width*$scope.svg.aspect)
    };

setTimeout(onResize,100);
$(window).resize(onResize)
}]);
stats.controller("PlayerCareerCtrl",["$scope","$location","Splits","StatsRequest",function($scope,$location,Splits,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.datasets={};

    function parseDataSets(datasets){
        $scope.datasets=[{
            name:"Regular Season",
            datatable:datasets.SeasonTotalsRegularSeason.datatable,
            datafooter:datasets.CareerTotalsRegularSeason.datatable
            },{
            name:"Post Season",
            datatable:datasets.SeasonTotalsPostSeason.datatable,
            datafooter:datasets.CareerTotalsPostSeason.datatable
            },{
            name:"All Star",
            datatable:datasets.SeasonTotalsAllStarSeason.datatable,
            datafooter:datasets.CareerTotalsAllStarSeason.datatable
            }]
        }
        function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerCareer","",$scope.params).then(function(){
            var careerData=StatsRequest.getData();
            parseDataSets(careerData);
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        $scope.Player=playerInfo;
        $scope.splits=Splits.get([{
            name:"PerMode",
            include:[{
                val:"Per36",
                text:"Per 36 Minutes"
            }],
            without:["Per48"]
            }]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            PerMode:$scope.splits.PerMode.selected.val
            };

        getStats()
        });
    $scope.switchPerMode=function(mode){
        $scope.params.PerMode=mode;
        getStats()
        }
    }]);
stats.controller("PlayerGameLogsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerGameLogs","",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getData();
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        playerInfo.TO_YEAR=+playerInfo.TO_YEAR;
        playerInfo.FROM_YEAR=+playerInfo.FROM_YEAR;
        $scope.splits=Splits.get([{
            name:"Season",
            initial:$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear)),
            seasonRange:[playerInfo.FROM_YEAR,playerInfo.TO_YEAR],
            include:[{
                val:"ALL",
                text:"All"
            }]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("PlayerHighsCtrl",["$scope","$location","Splits","StatsRequest","$routeParams","FEEDS_CONFIG","$http",function($scope,$location,Splits,StatsRequest,$routeParams,FEEDS_CONFIG,$http){
    "use strict";
    var feedurl="playerProfile2";
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        PlayerID:$routeParams.PlayerID,
        SeasonType:["Regular Season","Playoffs"],
        GraphStartSeason:"2013-14",
        GraphEndSeason:"2013-14",
        GraphStat:"PTS",
        PerMode:"PerGame"
    };

    $scope.moreStats=false;
    $scope.showMoreStats=function(){
        $scope.moreStats=true
        };

    $scope.showLessStats=function(){
        $scope.moreStats=false
        };

    var categories={
        Traditional:[{
            display:"Points ",
            stat:"PTS",
            isShown:true,
            format:"number",
            param:1
        },{
            display:"Rebounds ",
            stat:"REB",
            isShown:true,
            format:"number",
            param:1
        },{
            display:"Assists ",
            stat:"AST",
            isShown:true,
            format:"number",
            param:1
        },{
            display:"Steals ",
            stat:"STL",
            isShown:true,
            format:"number",
            param:2
        },{
            display:"Field Goals Made",
            stat:"FGM",
            isShown:false,
            format:"percent"
        },{
            display:"Free Throws Made",
            stat:"FTM",
            isShown:false,
            format:"percent"
        },{
            display:"Three Pointers Made",
            stat:"FG3M",
            isShown:false,
            format:"percent"
        },{
            display:"Blocks ",
            stat:"BLK",
            isShown:false,
            format:"number",
            param:2
        }]
        };

    function getSeasonNCareerHighs(){
        $scope.isLoading=true;
        StatsRequest.get(feedurl,"",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.isLoading=false;
            var careerHighs=datasets.CareerHighs.datatable;
            var seasonHighs=datasets.SeasonHighs.datatable;
            for(var i=0,len=categories.Traditional.length;i<len;i++){
                categories.Traditional[i].datasetCareer=[];
                categories.Traditional[i].datasetSeason=[];
                for(var j=0,len2=careerHighs.length;j<len2;j++){
                    if(categories.Traditional[i].stat===careerHighs[j].STAT){
                        categories.Traditional[i].datasetCareer.push(careerHighs[j])
                        }
                    }
                for(var k=0,len3=seasonHighs.length;k<len3;k++){
                if(categories.Traditional[i].stat===seasonHighs[k].STAT){
                    categories.Traditional[i].datasetSeason.push(seasonHighs[k])
                    }
                }
            }
            $scope.cats=categories.Traditional;
    $scope.limit=$scope.cats.length/2
    })
}
getSeasonNCareerHighs()
}]);
stats.controller("PlayerNavCtrl",["$scope","$location","$route","$filter",function($scope,$location,$route,$filter){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        setSelectedPage()
        });
    $scope.showStats=false;
    $scope.showGamelogs=false;
    $scope.showTracking=false;
    $scope.tabCount=6;
    var pages=[{
        page:"profile",
        path:"",
        text:"Stats Profile",
        type:"profile"
    },{
        page:"statsTraditional",
        path:"stats/",
        text:"Stats Traditional",
        type:"stat"
    },{
        page:"statsAdvanced",
        path:"stats/advanced/",
        text:"Stats Advanced",
        type:"stat"
    },{
        page:"statsMisc",
        path:"stats/misc/",
        text:"Stats Misc",
        type:"stat"
    },{
        page:"statsScoring",
        path:"stats/scoring/",
        text:"Stats Scoring",
        type:"stat"
    },{
        page:"statsUsage",
        path:"stats/usage/",
        text:"Stats Usage",
        type:"stat"
    },{
        page:"career",
        path:"career/",
        text:"Career"
    },{
        page:"vs",
        path:"vs/",
        text:"Comparison"
    },{
        page:"gamelogs",
        path:"gamelogs/",
        text:"GameLogs"
    },{
        page:"trackinglogsshots",
        path:"tracking/shots/",
        text:"Shot Logs",
        type:"tracking"
    },{
        page:"trackinglogsrebounds",
        path:"tracking/rebounds/",
        text:"Rebound Logs",
        type:"tracking"
    },{
        page:"trackingShots",
        path:"tracking/shots/",
        text:"Tracking Shots",
        type:"tracking"
    },{
        page:"trackingRebounds",
        path:"tracking/rebounds/",
        text:"Tracking Rebounds",
        type:"tracking"
    },{
        page:"trackingPasses",
        path:"tracking/passes/",
        text:"Tracking Passes",
        type:"tracking"
    },{
        page:"trackingDefense",
        path:"tracking/defense/",
        text:"Tracking Defense",
        type:"tracking"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.PlayerID+"/"+$scope.selected.path)
        };

    function setSelectedPage(){
        if(!$scope.pages){
            return
        }
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        }
        $scope.$watch("availableStats",function(availableStats){
        if(!availableStats){
            return
        }
        $scope.tabCount=6;
        $scope.tabCount-=availableStats.current?0:1;
        $scope.tabCount-=availableStats.stats?0:1;
        $scope.tabCount-=availableStats.tracking?0:1;
        $scope.pages=pages.slice(0);
        if(!availableStats.stats){
            $scope.pages=$filter("filter")($scope.pages,{
                type:"!stat"
            })
            }
            if(!availableStats.tracking){
            $scope.pages=$filter("filter")($scope.pages,{
                type:"!tracking"
            })
            }
            setSelectedPage()
        })
    }]);
stats.controller("PlayerProfileCtrl",["$scope","$location","Splits","StatsRequest","$routeParams","FEEDS_CONFIG","$http","$sce",function($scope,$location,Splits,StatsRequest,$routeParams,FEEDS_CONFIG,$http,$sce){
    "use strict";
    $scope.showMoreStats=function(array){
        array.limit=1
        };

    $scope.rankingLimit=1;
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        PlayerID:$routeParams.PlayerID,
        SeasonType:["Regular Season","Playoffs"],
        GraphStartSeason:"2013-14",
        GraphEndSeason:"2013-14",
        GraphStat:"PTS",
        PerMode:"PerGame"
    };

    function getSummaryInfo(){
        StatsRequest.get("playerSummary","",$scope.params).then(function(){
            var testTwo=StatsRequest.getData();
            $scope.playerInfo=testTwo.CommonPlayerInfo.datatable[0]
            })
        }
        function getPlayerNews(){
        $http({
            method:"GET",
            url:"/feeds/RotoWirePlayers-583598/"+$routeParams.PlayerID+".json"
            }).then(function(response){
            var stories=response.data.PlayerRotowires;
            $scope.stories=stories.slice(0,2);
            $scope.isLoading=false
            })
        }
        function getRankings(){
        StatsRequest.get("playerProfile2","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.regularRankings=datasets.SeasonRankingsRegularSeason;
            $scope.postRankings=datasets.SeasonRankingsPostSeason;
            $scope.nextGame=datasets.NextGame.datatable[0]
            })
        }
        function getBio(){
        $http({
            method:"GET",
            url:"/feeds/players/bios/"+$routeParams.PlayerID+".json"
            }).then(function(resp){
            if(!resp||!resp.data.Bio||!resp.data.Bio[1]){
                return
            }
            $scope.bio=$sce.trustAsHtml(resp.data.Bio[1].profText);
            $scope.bio2=$sce.trustAsHtml(resp.data.Bio[0].profText)
            })
        }
        getBio();
    getSummaryInfo();
    getPlayerNews();
    getRankings()
    }]);
stats.controller("ProfileAwardsCtrl",["$scope","$location","Splits","StatsRequest","$routeParams","FEEDS_CONFIG","$http",function($scope,$location,Splits,StatsRequest,$routeParams,FEEDS_CONFIG,$http){
    "use strict";
    var profileUrl="/feeds/players/awards/"+$routeParams.PlayerID+"_Award.js";
    $http.get(profileUrl).then(function(resp){
        $scope.awards=resp.data.PlayerAwards;
        $scope.totalRows=$scope.awards.length;
        $scope.rowsPerPage=5;
        $scope.currentPage=1;
        $scope.totalPages=Math.ceil($scope.totalRows/$scope.rowsPerPage);
        var pageChange=function(e){
            var alpha=($scope.currentPage-1)*$scope.rowsPerPage;
            var omega=alpha+$scope.rowsPerPage;
            $scope.page=$scope.rows.slice(alpha,omega)
            };

        var updateDataset=function(e){
            $scope.currentPage=1;
            $scope.rows=$scope.awards.slice(0);
            $scope.totalRows=$scope.rows.length;
            $scope.rowsPerPage=$scope.rowsPerPage||5;
            $scope.totalPages=Math.ceil($scope.totalRows/$scope.rowsPerPage);
            $scope.column="";
            pageChange()
            };

        updateDataset();
        $scope.prevPage=function(e){
            if($scope.currentPage==1){
                return
            }
            $scope.currentPage-=1
            };

        $scope.nextPage=function(e){
            if($scope.currentPage==$scope.totalPages){
                return
            }
            $scope.currentPage+=1
            };

        $scope.$watch("currentPage",pageChange)
        })
    }]);
stats.controller("PlayerStatsAdvancedCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"playerGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"playerOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"playerLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"playerInGameSplits"
    },{
        name:"Clutch Splits",
        url:"playerClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"playerTeamPerformance"
    },{
        name:"Year Over Year Splits",
        url:"playerYearOverYear"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Advanced",
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerStatsBaseCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"playerGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"playerOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"playerLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"playerInGameSplits"
    },{
        name:"Clutch Splits",
        url:"playerClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"playerTeamPerformance"
    },{
        name:"Year Over Year Splits",
        url:"playerYearOverYear"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        if(!$scope.availableStats.stats){
            $location.path($scope.PlayerID+"/career/")
            }
            var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerStatsMiscCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"playerGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"playerOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"playerLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"playerInGameSplits"
    },{
        name:"Clutch Splits",
        url:"playerClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"playerTeamPerformance"
    },{
        name:"Year Over Year Splits",
        url:"playerYearOverYear"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Misc",
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerStatsScoringCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.hasData=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"playerGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"playerOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"playerLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"playerInGameSplits"
    },{
        name:"Clutch Splits",
        url:"playerClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"playerTeamPerformance"
    },{
        name:"Year Over Year Splits",
        url:"playerYearOverYear"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Scoring",
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerStatsShootingCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerShooting","",$scope.params).then(function(){
            var ds=StatsRequest.getResults();
            $scope.datasets=ds.slice(0,ds.length-1);
            $scope.assists=ds.slice(-1);
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"Totals",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerStatsUsageCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"playerGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"playerOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"playerLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"playerInGameSplits"
    },{
        name:"Clutch Splits",
        url:"playerClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"playerTeamPerformance"
    },{
        name:"Year Over Year Splits",
        url:"playerYearOverYear"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.playerStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.playerStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Usage",
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };
        getStats()
        })
    }]);
stats.controller("PlayerSummaryCtrl",["$scope","$routeParams","PlayerSummaryService","$location",function($scope,$routeParams,PlayerSummaryService,$location){
    "use strict";
    $scope.isLoading=true;
    function getStats(){
        $scope.isLoading=true;
        PlayerSummaryService.get($scope.params).then(function(player){
            $scope.playerInfo=player.playerInfo;
            $scope.playerHeadlineStats=player.headlineStats;
            $scope.PlayerCode=player.playerInfo.PLAYERCODE;
            $scope.availableStats=player.availableStats;
            $scope.ai=$scope.playerInfo;
            $scope.isLoading=false
            })
        }
        $scope.isVersus=$location.path().indexOf("vs")>0?true:false;
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        if(!$routeParams.PlayerID||$routeParams.PlayerID==$scope.PlayerID){
            return
        }
        $scope.PlayerID=$routeParams.PlayerID;
        $scope.params={
            SeasonType:"Regular Season",
            LeagueID:"00",
            PlayerID:$scope.PlayerID
            };

        getStats()
        })
    }]);
stats.controller("PlayerTrackingDefenseCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerTrackingDefense","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.DefendingShots.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.noData=false;
                $scope.datasets=[{
                    name:"DefendingShots",
                    datatable:data.DefendingShots.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.trackingStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.trackingStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            TeamID:0,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerTrackingLogsReboundsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerTrackingLogRebounds","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.PtRebLog.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.noData=false;
                $scope.datasets=[{
                    name:"PtRebLog",
                    datatable:data.PtRebLog.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.trackingStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.trackingStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            TeamID:0,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerTrackingLogsShotsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerTrackingLogShots","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.PtShotLog.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.noData=false;
                $scope.datasets=[{
                    name:"PtShotLog",
                    datatable:data.PtShotLog.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.trackingStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.trackingStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            TeamID:0,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerTrackingPassesCtrl",["$scope","$filter","Splits","SEASON_CONFIG","PlayerTrackingDashPassesService",function($scope,$filter,Splits,SEASON_CONFIG,PlayerTrackingDashPassesService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        PlayerTrackingDashPassesService.get($scope.params).then(function(datasets){
            $scope.noData=false;
            $scope.datasets=datasets;
            if(datasets[0].datatable.length===0||datasets[0].datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.trackingStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.trackingStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","LastNGames","GameSegment","Period","DateFrom","DateTo"]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            TeamID:0,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            DateFrom:$scope.splits.DateFrom.selected.val,
            DateTo:$scope.splits.DateTo.selected.val
            };

        getStats()
        })
    }]);
stats.controller("PlayerTrackingReboundsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerTrackingRebounds","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.OverallRebounding.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.noData=false;
                $scope.datasets=[{
                    name:"OverallRebounding",
                    datatable:data.OverallRebounding.datatable
                    },{
                    name:"NumContestedRebounding",
                    datatable:data.NumContestedRebounding.datatable
                    },{
                    name:"RebDistanceRebounding",
                    datatable:data.RebDistanceRebounding.datatable
                    },{
                    name:"ShotDistanceRebounding",
                    datatable:data.ShotDistanceRebounding.datatable
                    },{
                    name:"ShotTypeRebounding",
                    datatable:data.ShotTypeRebounding.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.trackingStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.trackingStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            TeamID:0,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerTrackingShotsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("playerTrackingShots","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.Overall.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.noData=false;
                $scope.datasets=[{
                    name:"Overall",
                    datatable:data.Overall.datatable
                    },{
                    name:"GeneralShooting",
                    datatable:data.GeneralShooting.datatable
                    },{
                    name:"ShotClockShooting",
                    datatable:data.ShotClockShooting.datatable
                    },{
                    name:"DribbleShooting",
                    datatable:data.DribbleShooting.datatable
                    },{
                    name:"ClosestDefenderShooting",
                    datatable:data.ClosestDefenderShooting.datatable
                    },{
                    name:"ClosestDefender10ftPlusShooting",
                    datatable:data.ClosestDefender10ftPlusShooting.datatable
                    },{
                    name:"TouchTimeShooting",
                    datatable:data.TouchTimeShooting.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("playerInfo",function(playerInfo){
        if(!playerInfo){
            return
        }
        var initial=$filter("seasonyear")(Math.min(playerInfo.TO_YEAR,SEASON_CONFIG.trackingStats.SeasonYear));
        var range=[Math.max(playerInfo.FROM_YEAR,SEASON_CONFIG.trackingStats.SeasonYearFrom),playerInfo.TO_YEAR];
        if(range[0]>range[1]){
            $scope.noData=true;
            $scope.isLoading=false;
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:initial,
            seasonRange:range
        },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            LeagueID:"00",
            PlayerID:playerInfo.PERSON_ID,
            TeamID:0,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("PlayerVideoCtrl",["$scope","$location","Splits","StatsRequest","$routeParams","FEEDS_CONFIG","$http",function($scope,$location,Splits,StatsRequest,$routeParams,FEEDS_CONFIG,$http){
    "use strict";
    $scope.currentIndex=0;
    $scope.changePanel=function(direction){
        if($scope.currentIndex+direction<$scope.tweets.length&&$scope.currentIndex+direction>0){
            $scope.currentIndex+=direction
            }else{
            if($scope.currentIndex+direction<0){
                $scope.currentIndex=$scope.tweets.length-1
                }else $scope.currentIndex=0
                }
            };

$scope.showMoreStats=function(array){
    array.limit=1
    };

var feedurl="playerProfile";
$scope.params={
    MeasureType:"Base",
    LeagueID:"00",
    PlayerID:$routeParams.PlayerID,
    Season:"2013-14",
    SeasonType:["Regular Season","Playoffs"],
    GraphStartSeason:"2013-14",
    GraphEndSeason:"2013-14",
    GraphStat:"PTS",
    PerMode:"PerGame"
};

$scope.tweets=[{
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    handle:"@KG84",
    time:"20s",
    name:"Khalid Garner"
},{
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.",
    handle:"@KG84",
    time:"20s",
    name:"Khalid Garner"
},{
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    handle:"@KG84",
    time:"20s",
    name:"Khalid Garner"
},{
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.",
    handle:"@KG84",
    time:"20s",
    name:"Khalid Garner"
},{
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    handle:"@KG84",
    time:"20s",
    name:"Khalid Garner"
}];
function getSummaryInfo(){
    StatsRequest.get("playerSummary","",$scope.params).then(function(){
        var testTwo=StatsRequest.getData();
        $scope.playerInfo=testTwo.CommonPlayerInfo.datatable[0]
        })
    }
    function getPlayerNews(){
    $http({
        method:"GET",
        url:"/feeds/RotoWirePlayers-583598/"+$routeParams.PlayerID+".json"
        }).then(function(response){
        var stories=response.data.PlayerRotowires;
        $scope.stories=stories.slice(0,6);
        $scope.isLoading=false
        })
    }
    getSummaryInfo();
    getPlayerNews()
    }]);
stats.controller("PlayerListCtrl",["$scope","$timeout","$filter","SEASON_CONFIG","StatsRequest",function($scope,$timeout,$filter,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.listShown=false;
    $scope.isLoading=true;
    $scope.onlyActive=true;
    $scope.alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    $scope.selectedLetter="";
    $scope.search="";
    var playersAll;
    var playersActive;
    var playersAllGrouped;
    var playersActiveGrouped;
    var params={
        Season:SEASON_CONFIG.site.Season,
        LeagueID:"00",
        IsOnlyCurrentSeason:"0"
    };

    $scope.showList=function(){
        $scope.listShown=true
        };

    $scope.onlyInitial=function(letter){
        $scope.selectedLetter=$scope.selectedLetter==letter?"":letter
        };

    $scope.shouldHideLetter=function(letter){
        return letter.items.length===0||$scope.selectedLetter!==""&&$scope.selectedLetter!=letter.initial
        };

    function SortByInitial(a,b){
        return a.initial>b.initial?1:-1
        }
        $scope.$watch("onlyActive",function(onlyActive){
        $scope.letters=onlyActive?playersActiveGrouped:playersAllGrouped;
        $scope.search="";
        $scope.listShown=true
        });
    $scope.$watch("selectedLetter",function(selectedLetter){
        $scope.search="";
        if(selectedLetter===""){
            $scope.listShown=false
            }
        });
$scope.$watch("search",function(search){
    $scope.selectedLetter="";
    if(!playersAllGrouped){
        return
    }
    $scope.letters=$scope.onlyActive?playersActiveGrouped.slice(0):playersAllGrouped.slice(0);
    if(search.length>=3){
        for(var i in $scope.letters){
            var items=$filter("filter")($scope.letters[i].items,search);
            $scope.letters[i]={
                initial:$scope.letters[i].initial,
                items:items
            }
        }
        $scope.listShown=true
    }
    if(search.length<3&&$scope.selectedLetter===""){
    $scope.listShown=false
    }
});
StatsRequest.get("playerList","",params).then(function(){
    playersAll=StatsRequest.getData().CommonAllPlayers.datatable;
    playersActive=$filter("filter")(playersAll,{
        ROSTERSTATUS:1
    });
    playersAllGrouped=$filter("byLetter")(playersAll,"DISPLAY_LAST_COMMA_FIRST").sort(SortByInitial);
    playersActiveGrouped=$filter("byLetter")(playersActive,"DISPLAY_LAST_COMMA_FIRST").sort(SortByInitial);
    $scope.letters=playersActiveGrouped;
    $scope.isLoading=false
    })
}]);
stats.controller("PlaylistCtrl",["$scope","$element","$http","$location","$filter",function($scope,$element,$http,$location,$filter){
    "use strict";
    $scope.isLoading=true;
    $scope.playAll=true;
    $scope.currentIndex=0;
    $scope.selectedItem={};

    var params={
        LeagueID:"00",
        Season:"2013-14",
        SeasonType:"Regular Season",
        TeamID:"0",
        PlayerID:"0",
        GameID:"",
        Outcome:"",
        Location:"",
        Month:"0",
        SeasonSegment:"",
        DateFrom:"",
        DateTo:"",
        OpponentTeamID:"0",
        VsConference:"",
        VsDivision:"",
        Position:"",
        RookieYear:"",
        GameSegment:"",
        Period:"0",
        LastNGames:"0",
        ClutchTime:"",
        AheadBehind:"",
        PointDiff:"",
        RangeType:"1",
        StartPeriod:1,
        EndPeriod:10,
        StartRange:0,
        EndRange:0,
        ContextFilter:"",
        ContextMeasure:"FG_PCT"
    };

    var feeds={
        details:"/stats/videodetails",
        events:"/stats/videoevents",
        shotzone:"/stats/videoshotzone",
        shotzoneContext:"/stats/videoshotzonecontext"
    };

    var feed="";
    angular.extend(params,$location.search());
    if(params.ZoneMode){
        feed=feeds.shotzoneContext
        }else if(params.GameEventID){
        feed=feeds.events
        }else if(params.EventList){
        feed=feeds.shotzone
        }else{
        feed=feeds.details
        }
        $http({
        method:"GET",
        url:feed,
        params:params
    }).success(function(data){
        var items=data.resultSets.playlist;
        items.forEach(parseItem);
        $scope.items=$filter("filter")(items,{
            pta:"1"
        });
        $scope.isLoading=false;
        $scope.playItem(0)
        });
    function parseItem(item){
        item.teams=item.gc.split("/")[1];
        item.vtm=item.teams.substr(0,3);
        item.htm=item.teams.substr(3,3)
        }
        $scope.changeItem=function(dir){
        var i=$scope.currentIndex+dir;
        if(i>=0&&i<$scope.items.length){
            $scope.playItem(i)
            }
        };

$scope.playItem=function(i){
    $scope.currentIndex=i;
    $scope.selectedItem=$scope.items[i]
    };

$scope.$on("finishedPlaying",function(){
    $scope.changeItem(1);
    $scope.$digest()
    })
}]);
stats.controller("ScoresCtrl",["$scope","$location","$filter","ScoresService",function($scope,$location,$filter,ScoresService){
    "use strict";
    $scope.isLoading=true;
    $scope.noGames=true;
    $scope.games=[];
    $scope.showCal=false;
    $scope.dt=$location.path().slice(1);
    $scope.format="dd/MM/yyyy";
    $scope.params={
        LeagueID:"00",
        DayOffset:"0",
        gameDate:""
    };

    function setDate(adj){
        var date=new Date($scope.params.gameDate);
        date.setDate(date.getDate()+adj);
        var urlDate=$filter("date")(date,"MM/dd/yyyy");
        $location.path(urlDate)
        }
        $scope.changeDate=function(direction){
        if($scope.isLoading){
            return
        }
        switch(direction){
            case"next":
                setDate(1);
                break;
            case"prev":
                setDate(-1);
                break;
            default:
                setDate(1)
                }
            };

$scope.$watch("dt",function(newval,oldval){
    var urlDate=$filter("date")($scope.dt,"MM/dd/yyyy");
    $location.path(urlDate)
    });
var referred=document.referrer;
console.log(referred);
    $scope.$watch(function(){
    return $location.path()
    },function(){
    if($location.path().slice(1)){
        $scope.params.gameDate=$location.path().slice(1);
        getStats()
        }else{
        var date=new Date;
        var urlDate=$filter("date")(date,"MM/dd/yyyy");
        if(urlDate==$scope.params.gameDate){
            window.location.href=referred
            }
            $location.path(urlDate)
        }
    });
function getStats(){
    $scope.isLoading=true;
    ScoresService.get($scope.params).then(function(data){
        $scope.games=data.games;
        $scope.standings=data.standings;
        $scope.isLoading=false;
        if($scope.games.length===0){
            $scope.noGames=true
            }else{
            $scope.noGames=false
            }
        })
}
}]);
stats.controller("StandingsCtrl",["$scope","$location","$filter","StatsRequest",function($scope,$location,$filter,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showCal=false;
    $scope.showCal=false;
    $scope.dt=$location.path().slice(1);
    $scope.format="dd/MM/yyyy";
    $scope.params={
        LeagueID:"00",
        DayOffset:"0",
        gameDate:""
    };

    function setDate(adj){
        var date=new Date($scope.params.gameDate);
        date.setDate(date.getDate()+adj);
        var urlDate=$filter("date")(date,"MM/dd/yyyy");
        $location.path(urlDate)
        }
        $scope.changeDate=function(direction){
        if($scope.isLoading){
            return
        }
        switch(direction){
            case"next":
                setDate(1);
                break;
            case"prev":
                setDate(-1);
                break;
            default:
                setDate(1)
                }
            };

$scope.$watch("dt",function(newval,oldval){
    var urlDate=$filter("date")($scope.dt,"MM/dd/yyyy");
    $location.path(urlDate)
    });
$scope.$watch(function(){
    return $location.path()
    },function(){
    if($location.path().slice(1)){
        $scope.params.gameDate=$location.path().slice(1);
        getStats()
        }else{
        var date=new Date;
        var urlDate=$filter("date")(date,"MM/dd/yyyy");
        $location.path(urlDate)
        }
    });
function getStats(){
    $scope.isLoading=true;
    StatsRequest.get("scoreboard","",$scope.params).then(function(){
        var datasets=StatsRequest.getData();
        $scope.datasets=[{
            title:"Eastern Conference",
            datatable:datasets.EastConfStandingsByDay.datatable
            },{
            title:"Western Conference",
            datatable:datasets.WestConfStandingsByDay.datatable
            }];
        $scope.isLoading=false
        })
    }
}]);
stats.controller("ShotchartCtrl",["$scope","$element","$location","$filter","browser","ShotchartService",function($scope,$element,$location,$filter,browser,ShotchartService){
    "use strict";
    $scope.isLoading=true;
    $scope.zoneModes=[{
        label:"Basic Zones",
        value:"Basic"
    },{
        label:"Advanced Zones",
        value:"Advanced"
    }];
    $scope.zoneMode=$scope.zoneModes[1];
    $scope.showZones=true;
    $scope.showDetails=true;
    $scope.showShots=true;
    $scope.showSplits=false;
    $scope.court={
        margin:{
            top:15,
            right:10,
            bottom:10,
            left:10
        },
        width:478,
        height:450,
        rotation:40
    };

    $scope.svg={
        elm:$element.find("svg"),
        width:$scope.court.width+$scope.court.margin.left+$scope.court.margin.right,
        height:$scope.court.height+$scope.court.margin.top+$scope.court.margin.bottom
        };

    $scope.svg.aspect=$scope.svg.height/$scope.svg.width;
    $scope.params={
        PlayerID:"0",
        Season:"",
        SeasonType:"",
        LeagueID:"00",
        TeamID:"0",
        GameID:"",
        Outcome:"",
        Location:"",
        Month:"0",
        SeasonSegment:"",
        DateFrom:"",
        DateTo:"",
        OpponentTeamID:"0",
        VsConference:"",
        VsDivision:"",
        Position:"",
        RookieYear:"",
        GameSegment:"",
        Period:"0",
        LastNGames:0,
        ContextFilter:"",
        ContextMeasure:"FG_PCT",
        CFID:"",
        CFPARAMS:""
    };

    $scope.getZoneFill=function(type,zone){
        if(!$scope.zones||!$scope.zones[type]||!$scope.zones[type][zone]){
            return
        }
        switch($scope.zones[type][zone].leaguePerformance){
            case"above":
                return"#00ff00";
            case"average":
                return"#ffff00";
            case"below":
                return"#ff0000";
            default:
                return"none"
                }
            };

$scope.getShotFill=function(made){
    return made?"#33cc33  ":"#cc3333"
    };

$scope.download=function(){
    console.log("download image");
    var $xml=$("#court").clone();
    $xml.find("svg").removeAttr("style").removeAttr("xmlns");
    $xml.find("desc, defs").remove();
    var xml=$xml.html();
    var filename="Shotchart_"+Date.now();
    if(browser()=="ie"){
        filename+=".png"
        }
        var $file=$("<input></input>").attr({
        type:"hidden",
        value:"Shotchart_"+Date.now()+".png",
        name:"Filename"
    });
    var $svg=$("<input></input>").attr({
        type:"hidden",
        value:xml,
        name:"Data"
    });
    var $form=$("<form></form>").attr({
        method:"post",
        action:"/util/transcode",
        enctype:"application/x-www-form-urlencoded"
    }).append($svg,$file).appendTo(document.body).submit();
    return false
    };

function getStats(){
    $scope.isLoading=true;
    ShotchartService.get($scope.params).then(function(shotchart){
        $scope.zones=shotchart.groupedShots;
        $scope.league=shotchart.groupedLeague;
        $scope.shots=shotchart.shots;
        $scope.isLoading=false;
        setTimeout(onResize,100)
        })
    }
    function setParams(){
    for(var i in $location.search()){
        var param=$location.search()[i];
        $scope.params[i]=param
        }
    }
    function initOptions(){
    var mode=$location.search().mode||"Advanced";
    $scope.zoneMode=$filter("filter")($scope.zoneModes,{
        value:mode
    })[0];
    $scope.showZones=$location.search().showZones!="0";
    $scope.showDetails=$location.search().showDetails!="0";
    $scope.showShots=$location.search().showShots=="1"
    }
    function updateURL(){
    $location.search("mode",$scope.zoneMode.value);
    $location.search("showZones",$scope.showZones?1:0);
    $location.search("showDetails",$scope.showDetails?1:0);
    $location.search("showShots",$scope.showShots?1:0)
    }
    setParams();
    getStats();
    $scope.$watch("zoneMode",updateURL);
    $scope.$watch("showZones",updateURL);
    $scope.$watch("showDetails",updateURL);
    $scope.$watch("showShots",updateURL);
    initOptions();
    var onResize=function(){
    var width=Math.min(525,Math.max(295,$scope.svg.elm.width()));
    $scope.svg.elm.attr("width",width);
    $scope.svg.elm.attr("height",width*$scope.svg.aspect)
    };

setTimeout(onResize,250);
    $(window).resize(onResize)
    }]);
stats.controller("TeamGamelogsCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.datasets={};

    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamGameLogs","",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getData();
            $scope.noData=$scope.datasets.TeamGameLog.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[teamInfo.MIN_YEAR,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType"
        }]);
        $scope.params={
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TeamLineupsAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamLineups","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.datasets={
                lineups:datasets.Lineups
                };

            $scope.noData=datasets.Lineups.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[2007,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Advanced",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            GroupQuantity:$scope.splits.GroupQuantity.selected.val,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameID:$location.search().GameID||"",
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamLineupsBaseCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamLineups","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.datasets={
                lineups:datasets.Lineups
                };

            $scope.noData=datasets.Lineups.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[2007,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            GroupQuantity:$scope.splits.GroupQuantity.selected.val,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameID:$location.search().GameID||"",
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamLineupsFourFactorsCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamLineups","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.datasets={
                lineups:datasets.Lineups
                };

            $scope.noData=datasets.Lineups.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[2007,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Four Factors",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            GroupQuantity:$scope.splits.GroupQuantity.selected.val,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameID:$location.search().GameID||"",
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamLineupsMiscCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamLineups","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.datasets={
                lineups:datasets.Lineups
                };

            $scope.noData=datasets.Lineups.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[2007,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Misc",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            GroupQuantity:$scope.splits.GroupQuantity.selected.val,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameID:$location.search().GameID||"",
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamLineupsOpponentCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamLineups","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.datasets={
                lineups:datasets.Lineups
                };

            $scope.noData=datasets.Lineups.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[2007,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Opponent",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            GroupQuantity:$scope.splits.GroupQuantity.selected.val,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameID:$location.search().GameID||"",
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamLineupsScoringCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.rowsPerPage=50;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamLineups","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.datasets={
                lineups:datasets.Lineups
                };

            $scope.noData=datasets.Lineups.rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[2007,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"GroupQuantity","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Scoring",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            GroupQuantity:$scope.splits.GroupQuantity.selected.val,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            GameID:$location.search().GameID||"",
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamNavCtrl",["$scope","$location","$route",function($scope,$location,$route){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"profile",
        path:"",
        text:"Profile"
    },{
        page:"statsTraditional",
        path:"stats/",
        text:"Stats Traditional"
    },{
        page:"statsAdvanced",
        path:"stats/advanced/",
        text:"Stats Advanced"
    },{
        page:"statsFourFactors",
        path:"stats/fourfactors/",
        text:"Stats Four Factors"
    },{
        page:"statsMisc",
        path:"stats/misc/",
        text:"Stats Misc"
    },{
        page:"statsScoring",
        path:"stats/scoring/",
        text:"Stats Scoring"
    },{
        page:"statsOpponent",
        path:"stats/opponent/",
        text:"Stats Opponent"
    },{
        page:"statsShooting",
        path:"stats/shooting/",
        text:"Stats Shooting"
    },{
        page:"lineupsTraditional",
        path:"lineups/",
        text:"Lineups Traditional"
    },{
        page:"lineupsAdvanced",
        path:"lineups/advanced/",
        text:"Lineups Advanced"
    },{
        page:"lineupsFourFactors",
        path:"lineups/fourfactors/",
        text:"Lineups Four Factors"
    },{
        page:"lineupsMisc",
        path:"lineups/misc",
        text:"Lineups Misc"
    },{
        page:"lineupsScoring",
        path:"lineups/scoring",
        text:"Lineups Scoring"
    },{
        page:"lineupsOpponent",
        path:"lineups/opponent",
        text:"Lineups Opponent"
    },{
        page:"playersTraditional",
        path:"players/",
        text:"Players Traditional"
    },{
        page:"playersAdvanced",
        path:"players/advanced",
        text:"Players Advanced"
    },{
        page:"playersMisc",
        path:"players/misc",
        text:"Players Misc"
    },{
        page:"playersScoring",
        path:"players/scoring",
        text:"Players Scoring"
    },{
        page:"playersUsage",
        path:"players/usage",
        text:"Players Usage"
    },{
        page:"onoffcourtTraditional",
        path:"onoffcourt/",
        text:"On/Off Court Traditional"
    },{
        page:"onoffcourtAdvanced",
        path:"onoffcourt/advanced",
        text:"On/Off Court Advanced"
    },{
        page:"onoffcourtFourFactors",
        path:"onoffcourt/fourfactors",
        text:"On/Off Court Four Factors"
    },{
        page:"onoffcourtMisc",
        path:"onoffcourt/misc",
        text:"On/Off Court Misc"
    },{
        page:"onoffcourtScoring",
        path:"onoffcourt/scoring",
        text:"On/Off Court Scoring"
    },{
        page:"onoffcourtOpponent",
        path:"onoffcourt/opponent",
        text:"On/Off Court Opponent"
    },{
        page:"onoffcourtSummary",
        path:"onoffcourt/summary",
        text:"On/Off Court Summary"
    },{
        page:"seasons",
        path:"seasons/",
        text:"Seasons"
    },{
        page:"gamelogs",
        path:"gamelogs/",
        text:"Game Logs"
    },{
        page:"yearoveryear",
        path:"yearoveryear/",
        text:"Year Over Year"
    },{
        page:"trackingdashshots",
        path:"tracking/shots/",
        text:"Tracking Shots"
    },{
        page:"trackingdashrebounds",
        path:"tracking/rebounds/",
        text:"Tracking Rebounds"
    },{
        page:"trackingdashpasses",
        path:"tracking/passes/",
        text:"Tracking Passes"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.TeamID+"/"+$scope.selected.path)
        }
    }]);
stats.controller("TeamOnOffCourtAdvancedCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffDetails","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Advanced",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"Totals",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamOnOffCourtBaseCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffDetails","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            initial:"Per48",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamOnOffCourtFourFactorsCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffDetails","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Four Factors",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"Totals",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamOnOffCourtMiscCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffDetails","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            initial:"Totals",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Misc",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamOnOffCourtOpponentCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffDetails","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            initial:"Per48",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Opponent",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamOnOffCourtScoringCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffDetails","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Scoring",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamOnOffCourtSummaryCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayerOnOffSummary","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=datasets.slice(0,1);
            $scope.players=datasets.slice(1);
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"Totals",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamPlayersCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.datasets={};

    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamGameLogs","",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getData();
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,2013]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TeamPlayersAdvancedCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayers","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=[datasets[0]];
            $scope.players=[datasets[1]];
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Advanced",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamPlayersBaseCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayers","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=[datasets[0]];
            $scope.players=[datasets[1]];
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };
        getStats()
        })
    }]);
stats.controller("TeamPlayersMiscCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayers","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=[datasets[0]];
            $scope.players=[datasets[1]];
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Misc",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamPlayersScoringCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayers","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=[datasets[0]];
            $scope.players=[datasets[1]];
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Scoring",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamPlayersUsageCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamPlayers","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.overall=[datasets[0]];
            $scope.players=[datasets[1]];
            $scope.noData=datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Usage",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"Totals",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamProfileCtrl",["$scope","$location","$http",function($scope,$location,$http){
    "use strict";
    $scope.isLoading=true;
    var joinLeaderData=function(headers,fields){
        var obj={};

        for(var i in headers){
            obj[headers[i]]=fields[i]
            }
            return obj
        };

    $scope.$on("coachesLoaded",function(event,coaches){
        $scope.coaches=coaches
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        var profileURL="/feeds/teams/profile/"+teamInfo.TEAM_ID+"_TeamProfile.js";
        var historical="/feeds/teams/stats/"+teamInfo.TEAM_ID+"_HistoricalLeaders.js";
        $http({
            method:"GET",
            url:profileURL
        }).then(function(response){
            var profile=response.data.TeamDetails;
            $scope.profile={
                details:profile[0].Details[0],
                history:profile[1].History,
                social:profile[2].SocialSites,
                awards:{
                    championships:profile[3].Awards[0].Championships,
                    conferences:profile[3].Awards[1].ConferenceTitles,
                    divisions:profile[3].Awards[2].DivitionalTitles
                    },
                hof:profile[4].HallOfFameInductees,
                retired:profile[5].RetiredMembers
                }
            });
    $http({
        method:"GET",
        url:historical
    }).then(function(response){
        var leaders=response.data.resultSets[0];
        $scope.leaders=joinLeaderData(leaders.headers,leaders.rowSet[0])
        })
    })
}]);
stats.controller("TeamRosterCtrl",["$scope","$location","$rootScope","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$rootScope,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamCommonRoster","",$scope.params).then(function(){
            var datasets=StatsRequest.getResults();
            $scope.datasets=[datasets[0]];
            $rootScope.$broadcast("coachesLoaded",datasets[1].datatable);
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[teamInfo.MIN_YEAR,teamInfo.MAX_YEAR]
            }]);
        $scope.params={
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TeamSeasonsCtrl",["$scope","$location","Splits","StatsRequest",function($scope,$location,Splits,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.rowsPerPage=100;
    $scope.datasets={};

    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamSeason","",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getData();
            $scope.isLoading=false
            })
        }
        $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.params={
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            PerMode:"Totals",
            SeasonType:"Regular Season"
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsAdvancedCtrl",["$scope","$location","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"teamGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"teamOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"teamLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"teamInGameSplits"
    },{
        name:"Clutch Splits",
        url:"teamClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"teamPerformanceSplits"
    },{
        name:"Year over Year",
        url:"teamYearOverYearSplits"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Advanced",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsBaseCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.hasShotchart=true;
    $scope.hasVideo=true;
    $scope.hasTracking=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"teamGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"teamOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"teamLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"teamInGameSplits"
    },{
        name:"Clutch Splits",
        url:"teamClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"teamPerformanceSplits"
    },{
        name:"Year over Year",
        url:"teamYearOverYearSplits"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsFourFactorsCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"teamGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"teamOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"teamLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"teamInGameSplits"
    },{
        name:"Clutch Splits",
        url:"teamClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"teamPerformanceSplits"
    },{
        name:"Year over Year",
        url:"teamYearOverYearSplits"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Four Factors",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsMiscCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"teamGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"teamOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"teamLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"teamInGameSplits"
    },{
        name:"Clutch Splits",
        url:"teamClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"teamPerformanceSplits"
    },{
        name:"Year over Year",
        url:"teamYearOverYearSplits"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Misc",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsOpponentCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"teamGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"teamOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"teamLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"teamInGameSplits"
    },{
        name:"Clutch Splits",
        url:"teamClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"teamPerformanceSplits"
    },{
        name:"Year over Year",
        url:"teamYearOverYearSplits"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },{
            name:"PerMode",
            include:[{
                val:"Per100Possessions",
                text:"Per 100 Poss"
            },{
                val:"Per100Plays",
                text:"Per 100 Plays"
            },{
                val:"Per48",
                text:"Per 48 Minutes"
            },{
                val:"Per40",
                text:"Per 40 Minutes"
            },{
                val:"Per36",
                text:"Per 36 Minutes"
            },{
                val:"PerMinute",
                text:"Per 1 Minute"
            },{
                val:"PerPossession",
                text:"Per 1 Poss"
            },{
                val:"PerPlay",
                text:"Per 1 Play"
            },{
                val:"MinutesPer",
                text:"Minutes Per"
            }]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Opponent",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsScoringCtrl",["$scope","$location","Splits","StatsRequest","SEASON_CONFIG",function($scope,$location,Splits,StatsRequest,SEASON_CONFIG){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    $scope.feeds=[{
        name:"General Splits",
        url:"teamGeneralSplits"
    },{
        name:"Opponent Splits",
        url:"teamOpponentSplits"
    },{
        name:"LastNGames Splits",
        url:"teamLastNGamesSplits"
    },{
        name:"In Game Splits",
        url:"teamInGameSplits"
    },{
        name:"Clutch Splits",
        url:"teamClutchSplits"
    },{
        name:"Team Performance Splits",
        url:"teamPerformanceSplits"
    },{
        name:"Year over Year",
        url:"teamYearOverYearSplits"
    }];
    $scope.feed=$scope.feeds[0];
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get($scope.feed.url,"",$scope.params).then(function(){
            $scope.datasets=StatsRequest.getResults();
            $scope.noData=$scope.datasets[0].rowSet.length===0&&$scope.splits.SeasonType.selected.val=="Playoffs";
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[SEASON_CONFIG.teamStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Scoring",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"PerGame",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamStatsShootingCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.hasData=false;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamShootingSplits","",$scope.params).then(function(){
            var ds=StatsRequest.getResults();
            $scope.datasets=ds.slice(0,ds.length-1);
            $scope.assists=ds.slice(-1);
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.teamStats.Season,
            seasonRange:[1997,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.teamStats.SeasonType,
            without:["Preseason"]
            },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:"Totals",
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamSummaryCtrl",["$scope","$location","$routeParams","SEASON_CONFIG","StatsRequest",function($scope,$location,$routeParams,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    function getStats(){
        $scope.isLoading=true;
        StatsRequest.get("teamSummary","",$scope.params).then(function(){
            var datasets=StatsRequest.getData();
            $scope.teamInfo=datasets.TeamInfoCommon.datatable[0];
            $scope.teamRanks=datasets.TeamSeasonRanks.datatable[0];
            $scope.ai=$scope.teamInfo;
            $scope.isLoading=false
            })
        }
        $scope.$on("$routeChangeSuccess",function(event,routeData){
        if(!$routeParams.TeamID||$routeParams.TeamID==$scope.TeamID){
            return
        }
        $scope.TeamID=$routeParams.TeamID;
        if($scope.TeamID.toString().length!=10){
            document.location="/teams/"
            }
            $scope.params={
            Season:SEASON_CONFIG.teamProfile.Season,
            SeasonType:SEASON_CONFIG.teamProfile.SeasonType,
            LeagueID:"00",
            TeamID:$scope.TeamID
            };

        getStats()
        })
    }]);
stats.controller("TeamTrackingDashPassesCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        $scope.noData=false;
        StatsRequest.get("teamTrackingDashPasses","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.PassesMade.datatable.length===0&&data.PassesReceived.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.datasets=[{
                    name:"Passes Made",
                    datatable:data.PassesMade.datatable
                    },{
                    name:"Passes Received",
                    datatable:data.PassesReceived.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamTrackingDashReboundsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        $scope.noData=false;
        StatsRequest.get("teamTrackingDashRebounds","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.OverallRebounding.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.datasets=[{
                    name:"OverallRebounding",
                    datatable:data.OverallRebounding.datatable
                    },{
                    name:"NumContestedRebounding",
                    datatable:data.NumContestedRebounding.datatable
                    },{
                    name:"RebDistanceRebounding",
                    datatable:data.RebDistanceRebounding.datatable
                    },{
                    name:"ShotDistanceRebounding",
                    datatable:data.ShotDistanceRebounding.datatable
                    },{
                    name:"ShotTypeRebounding",
                    datatable:data.ShotTypeRebounding.datatable
                    }]
                }
                $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamTrackingDashShotsCtrl",["$scope","$location","$filter","Splits","SEASON_CONFIG","StatsRequest",function($scope,$location,$filter,Splits,SEASON_CONFIG,StatsRequest){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    $scope.noData=false;
    function getStats(){
        $scope.isLoading=true;
        $scope.noData=false;
        StatsRequest.get("teamTrackingDashShots","",$scope.params).then(function(){
            var data=StatsRequest.getData();
            if(data.GeneralShooting.datatable.length===0){
                $scope.noData=true;
                $scope.datasets=[]
                }else{
                $scope.datasets=[{
                    name:"GeneralShooting",
                    datatable:data.GeneralShooting.datatable
                    },{
                    name:"ShotClockShooting",
                    datatable:data.ShotClockShooting.datatable
                    },{
                    name:"DribbleShooting",
                    datatable:data.DribbleShooting.datatable
                    },{
                    name:"ClosestDefenderShooting",
                    datatable:data.ClosestDefenderShooting.datatable
                    },{
                    name:"ClosestDefender10ftPlusShooting",
                    datatable:data.ClosestDefender10ftPlusShooting.datatable
                    },{
                    name:"TouchTimeShooting",
                    datatable:data.TouchTimeShooting.datatable
                    }]
            }
            $scope.isLoading=false
            })
        }
        $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("teamInfo",function(teamInfo){
        if(!teamInfo){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonYearFrom,teamInfo.MAX_YEAR]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            },"PerMode","PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"]);
        $scope.params={
            MeasureType:"Base",
            LeagueID:"00",
            TeamID:teamInfo.TEAM_ID,
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val,
            PerMode:$scope.splits.PerMode.selected.val,
            PlusMinus:$scope.splits.PlusMinus.selected.val,
            PaceAdjust:$scope.splits.PaceAdjust.selected.val,
            Rank:$scope.splits.Rank.selected.val,
            Outcome:$scope.splits.Outcome.selected.val,
            Location:$scope.splits.Location.selected.val,
            Month:$scope.splits.Month.selected.val,
            SeasonSegment:$scope.splits.SeasonSegment.selected.val,
            OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
            VsConference:$scope.splits.VsConference.selected.val,
            VsDivision:$scope.splits.VsDivision.selected.val,
            GameSegment:$scope.splits.GameSegment.selected.val,
            Period:$scope.splits.Period.selected.val,
            LastNGames:$scope.splits.LastNGames.selected.val,
            DateFrom:"",
            DateTo:""
        };

        getStats()
        })
    }]);
stats.controller("TeamListCtrl",["$scope","$filter","TEAMS",function($scope,$filter,TEAMS){
    "use strict";
    $scope.isLoading=true;
    var teams=TEAMS.slice(0);
    $scope.conferences=[{
        name:"Eastern",
        divisions:[{
            name:"Atlantic",
            teams:$filter("filter")(teams,{
                division:"Atlantic"
            })
            },{
            name:"Central",
            teams:$filter("filter")(teams,{
                division:"Central"
            })
            },{
            name:"Southeast",
            teams:$filter("filter")(teams,{
                division:"Southeast"
            })
            }]
        },{
        name:"Western",
        divisions:[{
            name:"Northwest",
            teams:$filter("filter")(teams,{
                division:"Northwest"
            })
            },{
            name:"Pacific",
            teams:$filter("filter")(teams,{
                division:"Pacific"
            })
            },{
            name:"Southwest",
            teams:$filter("filter")(teams,{
                division:"Southwest"
            })
            }]
        }];
    $scope.isLoading=false
    }]);
stats.controller("TrackingCatchShootCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"catchShoot",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingDefenseCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"defense",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingDrivesCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"drives",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingNavCtrl",["$scope","$location","$route",function($scope,$location,$route){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        $scope.page=$route.current.page;
        $scope.selected=$scope.pages.filter(function(n){
            return n.page==$scope.page
            })[0]
        });
    $scope.pages=[{
        page:"summary",
        path:"",
        text:"Profile"
    },{
        page:"catchshoot",
        path:"catchshoot",
        text:"Catch & Shoot"
    },{
        page:"defense",
        path:"defense",
        text:"Defense"
    },{
        page:"drives",
        path:"drives",
        text:"Drives"
    },{
        page:"passing",
        path:"passing",
        text:"Passing"
    },{
        page:"posessions",
        path:"posessions",
        text:"Possessions"
    },{
        page:"pullup",
        path:"pullup",
        text:"Pull Up Shooting"
    },{
        page:"rebounding",
        path:"rebounding",
        text:"Rebounding"
    },{
        page:"shooting",
        path:"shooting",
        text:"Shooting Efficiency"
    },{
        page:"speed",
        path:"speed",
        text:"Speed & Distance"
    }];
    $scope.onNavChange=function(){
        $location.path($scope.Section+"/"+$scope.selected.path)
        }
    }]);
stats.controller("TrackingPassingCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"passing",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingPossessionsCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"touches",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingPullupCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"pullUpShoot",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingReboundingCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"rebounding",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingShootingCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"shooting",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingSpeedCtrl",["$scope","$location","Splits","SEASON_CONFIG","SportVuDataService",function($scope,$location,Splits,SEASON_CONFIG,SportVuDataService){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    function getStats(){
        $scope.isLoading=true;
        SportVuDataService.get($scope.params,"speed",$scope.Section).then(function(datasets){
            $scope.datasets=datasets;
            $scope.isLoading=false
            })
        }
        $scope.$on("customFields",function(event,cf){
        $scope.customFields=cf
        });
    $scope.$on("runit",function(event){
        getStats()
        });
    $scope.$watch("Section",function(Section){
        if(!Section){
            return
        }
        $scope.splits=Splits.get([{
            name:"Season",
            initial:SEASON_CONFIG.trackingStats.Season,
            seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
            },{
            name:"SeasonType",
            initial:SEASON_CONFIG.trackingStats.SeasonType,
            without:["Preseason"]
            }]);
        $scope.params={
            Season:$scope.splits.Season.selected.val,
            SeasonType:$scope.splits.SeasonType.selected.val
            };

        getStats()
        })
    }]);
stats.controller("TrackingSummaryCtrl",["$scope","$location","Splits","$http","StatsRequest","$filter","SEASON_CONFIG","$sce",function($scope,$location,Splits,$http,StatsRequest,$filter,SEASON_CONFIG,$sce){
    "use strict";
    $scope.currentIndex=0;
    $scope.changePanel=function(direction){
        if($scope.currentIndex+direction<8&&$scope.currentIndex+direction>0){
            $scope.currentIndex+=direction
            }else{
            if($scope.currentIndex+direction<0){
                $scope.currentIndex=7
                }else $scope.currentIndex=0
                }
            };

$scope.isLoading=true;
$scope.showSplits=false;
$scope.splits=Splits.get([{
    name:"Season",
    initial:SEASON_CONFIG.trackingStats.Season,
    seasonRange:[SEASON_CONFIG.trackingStats.SeasonFrom,SEASON_CONFIG.trackingStats.Season]
    },{
    name:"SeasonType",
    initial:SEASON_CONFIG.trackingStats.SeasonType,
    without:["Preseason"]
    }]);
$scope.params={
    Season:$scope.splits.Season.selected.val,
    SeasonType:$scope.splits.SeasonType.selected.val
    };

$scope.Section=$location.path().indexOf("team")>0?"team":"player";
    $scope.categories={
    player:[{
        cat:"PlayerTrackingSpeedStats",
        heading:"Speed and Distance",
        url:"speed",
        definition:" Statistics that measure the distance covered and the average speed of all movements (sprinting, jogging, standing, walking, backwards and forwards) by a player while on the court.",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"AV_SPD",
            title:"Average Speed",
            format:"number",
            param:2,
            toolText:"Average Speed (mph) - The average speed in miles per hour that the player was moving while on the court."
        },{
            val:"DIST",
            title:"Distance",
            format:"number",
            param:2,
            toolText:"Total Distance (mi) - The distance in miles that a player covered while on the court."
        },{
            val:"DIST_PG",
            title:"Distance Per Game",
            format:"number",
            param:2,
            toolText:"Distance Per Game (mi) - The distance in miles that a player covered while on the court per game."
        }]
        },{
        cat:"PlayerTrackingTouchesStats",
        heading:"Touches",
        url:"possessions",
        definition:"The number of times a player touches and possesses the ball.",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"PTS_TCH",
            title:"Points Per Touch",
            format:"number",
            param:2,
            toolText:"Points Per Touch - The number of points a player scores per times they possesed the ball."
        },{
            val:"TCH",
            title:"Touches Per Game",
            format:"number",
            param:2,
            toolText:"Touches Per Game - The number of times a player touches and possesses the ball per game."
        },{
            val:"TCH_TOT",
            title:"Total Touches",
            toolText:"Total Touches - The number of times a player touches and possesses the ball."
        }]
        },{
        cat:"PlayerTrackingPassingStats",
        heading:"Passing",
        url:"passing",
        definition:"The total number of passes a player makes and the scoring opportunities (basket, free throw, assist) that come from those passes.",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"PTS_CRT",
            title:"Points Created by AST per Game",
            format:"number",
            param:2,
            toolText:"Points Created by Assist per Game - Points created by a player or team through their assists."
        },{
            val:"PASS",
            title:"Passes Per Game",
            format:"number",
            param:2,
            toolText:"Passes - The number of passes a player has made."
        },{
            val:"AST_TOT",
            title:"Total Assists",
            toolText:"Total Assists - An assist occurs when a player completes a pass to a teammate that directly leads to a made field goal."
        }]
        },{
        cat:"PlayerTrackingDefenseStats",
        heading:"Defensive Impact",
        url:"defense",
        definition:"Statistics related to defense, including blocks, steals and defending the basket (a defender within 5 feet of the basket and 5 feet of the shooter).",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"FGP_DEFEND_RIM",
            title:"Opp FG% at Rim",
            format:"percent",
            param:1,
            toolText:"Opponents Field Goal Percentage at the Rim - The opponents field goal percentage at the rim when the player or team is contesting the shot."
        },{
            val:"FGM_DEFEND_RIM",
            title:"Opp FGM at Rim Per Game",
            format:"number",
            param:2,
            toolText:"Opponents Field Goals Made at The Rim Per Game - The number of field goals an opponent makes at the rim when the player or team is contesting the shot."
        },{
            val:"BLK_TOT",
            title:"Total BLK",
            toolText:"Total Blocks - A block occurs when an offensive player attempts a shot, and the defense player tips the ball, blocking their chance to score."
        }]
        },{
        cat:"PlayerTrackingReboundingStats",
        heading:"Rebounding Opportunities",
        url:"rebounding",
        definition:"Statistics that measure the number of rebounds a player gathers compared to the number of rebounding chances (within a 3.5-foot vicinity).",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"REB_CHANCE",
            title:"Rebound Chances Per Game",
            format:"number",
            param:2,
            toolText:"Rebounding Chances Per Game - The number of times player was within the vicinity (3.5 ft) of a rebound."
        },{
            val:"REB_COL_PCT",
            title:"Percent of Available REB Grabbed",
            format:"percent",
            param:2,
            toolText:"Percent of Available Rebounds Grabbed - Percentage of total rebounds gathered when in the vicinity (3.5 ft) of a rebound."
        },{
            val:"REB_TOT",
            title:"Total REB",
            toolText:"Total Rebounds - A rebound occurs when a player recovers the ball after a missed shot. This statistic is the number of total rebounds a player or team has collected on either offense or defense."
        }]
        },{
        cat:"PlayerTrackingDrivesStats",
        heading:"Drives",
        url:"drives",
        definition:"Statistics related to drives to the basket -- any touch that starts at least 20 feet of the hoop and is dribbled within 10 feet of the hoop, excluding fast breaks.",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"DPP",
            title:"Points Per Game on Drives",
            format:"number",
            param:2,
            toolText:"Points Per Game on Drives - The number of points a player has accumulated on drives to the basket."
        },{
            val:"DTP",
            title:"Team Points Per Game on Drives",
            format:"number",
            param:2,
            toolText:"Team Points Per Game on Drives - The number of points per game a team has accumulated on drives to the basket by this player."
        },{
            val:"DPP_TOT",
            title:"Total Points on Drives",
            toolText:"Total Points Per Game on Drives - The total number of points a team has accumulated on drives to the basket by this player."
        }]
        },{
        cat:"PlayerTrackingCatchShootStats",
        heading:"Catch and Shoot",
        url:"catchshoot",
        definition:" Statistics related to any jump shot outside of 10 feet where a player possessed the ball for 2 seconds or less and took no dribbles.",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"PTS",
            title:"Catch and Shoot Points Per Game",
            format:"number",
            param:2,
            toolText:"Catch and Shoot Points Per Game - The number of points scored per game on Catch and Shoot opportunities."
        },{
            val:"FG3M",
            title:"Catch and Shoot 3FGM Per Game",
            format:"number",
            param:2,
            toolText:"Catch and Shoot 3FGM Per Game - The number of 3 Point Field Goals made per game on Catch and Shoot opportunities."
        },{
            val:"PTS_TOT",
            title:"Total Catch and Shoot PTS",
            toolText:"Total Catch and Shoot Points - The total number of points scored on Catch and Shoot opportunities."
        }]
        },{
        cat:"PlayerTrackingPullUpShootStats",
        heading:"Pull Up Shots",
        url:"pullup",
        definition:"Statistics related to any jump shot outside 10 feet where a player took 1 or more dribbles before shooting",
        stats:[{
            val:"PLAYER_ID",
            title:""
        },{
            val:"PLAYER",
            title:"Player"
        },{
            val:"PTS",
            title:"Pullup Shots Points Per Game",
            format:"number",
            param:2,
            toolText:"Pullup Shots Points Per Game - The number of points scored per game on Pull Up Shot opportunities."
        },{
            val:"FG3M",
            title:"Pullup Shots 3FGM Per Game",
            format:"number",
            param:2,
            toolText:"Pullup Shots 3FGM Per Game - The number of 3 Point Field Goals made per game on Pull Up Shot opportunities."
        },{
            val:"PTS_TOT",
            title:"Total Pullup Shots PTS",
            toolText:"Total Pullup Shots PTS - The total number of points scored on Pull Up Shot opportunities."
        }]
        }],
    team:[{
        cat:"TeamTrackingSpeedStats",
        heading:"Speed and Distance",
        url:"speed",
        definition:" Statistics that measure the distance covered and the average speed of all movements (sprinting, jogging, standing, walking, backwards and forwards) by a player while on the court.",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"AV_SPD",
            title:"Average Speed",
            format:"number",
            param:2,
            toolText:"Average Speed (mph) - The average speed in miles per hour that the players on the team were moving while on the court."
        },{
            val:"DIST",
            title:"Distance",
            toolText:"Total Distance (mi) - The distance in miles that a team covered while on the court."
        },{
            val:"DIST_PG",
            title:"Distance Per Game",
            format:"number",
            param:2,
            toolText:"Distance Per Game (mi) - The distance in miles that a team covered while on the court per game."
        }]
        },{
        cat:"TeamTrackingTouchesStats",
        heading:"Touches",
        url:"possessions",
        definition:"The number of times a player touches and possesses the ball.",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"PTS_TCH",
            title:"Points Per Touch",
            format:"number",
            param:2,
            toolText:"Points Per Touch - The number of points a team scores per times they possesed the ball."
        },{
            val:"TCH",
            title:"Touches Per Game",
            format:"number",
            param:2,
            toolText:"Touches Per Game - The number of times a team touches and possesses the ball per game."
        },{
            val:"TCH_TOT",
            title:"Total Touches",
            toolText:"Total Touches - The number of times a team touches and possesses the ball."
        }]
        },{
        cat:"TeamTrackingPassingStats",
        heading:"Passing",
        url:"passing",
        definition:"The total number of passes a player makes and the scoring opportunities (basket, free throw, assist) that come from those passes.",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"PTS_CRT",
            title:"Points Created by AST per Game",
            format:"number",
            param:2,
            toolText:"Points Created by Assist per Game - Points created by a player or team through their assists."
        },{
            val:"PASS",
            title:"Passes Per Game",
            format:"number",
            param:2,
            toolText:"Passes - The number of passes a team has made."
        },{
            val:"AST_TOT",
            title:"Total Assists",
            toolText:"Total Assists - An assist occurs when a player completes a pass to a teammate that directly leads to a made field goal."
        }]
        },{
        cat:"TeamTrackingDefenseStats",
        heading:"Defense",
        definition:"Statistics related to defense, including blocks, steals and defending the basket (a defender within 5 feet of the basket and 5 feet of the shooter).",
        url:"defense",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"FGP_DEFEND_RIM",
            title:"Opp FG% at Rim",
            format:"percent",
            param:1,
            toolText:"Opponents Field Goal Percentage at the Rim - The opponents field goal percentage at the rim when the player or team is contesting the shot."
        },{
            val:"FGM_DEFEND_RIM",
            title:"Opp FGM at Rim Per Game",
            format:"number",
            param:2,
            toolText:"Opponents Field Goals Made at The Rim Per Game - The number of field goals an opponent makes at the rim when the player or team is contesting the shot."
        },{
            val:"BLK_TOT",
            title:"Total BLK",
            toolText:"Total Blocks - A block occurs when an offensive player attempts a shot, and the defense player tips the ball, blocking their chance to score."
        }]
        },{
        cat:"TeamTrackingReboundingStats",
        heading:"Rebounding",
        url:"rebounding",
        definition:"Statistics that measure the number of rebounds a player gathers compared to the number of rebounding chances (within a 3.5-foot vicinity).",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"REB_CHANCE",
            title:"Rebound Chances Per Game",
            format:"number",
            param:2,
            toolText:"Rebounding Chances Per Game - The number of times a player on the team was within the vicinity (3.5 ft) of a rebound."
        },{
            val:"REB_COL_PCT",
            title:"Percent of Available REB Grabbed",
            format:"number",
            param:2,
            toolText:"Percent of Available Rebounds Grabbed - Percentage of total rebounds gathered when in the vicinity (3.5 ft) of a rebound."
        },{
            val:"REB_TOT",
            title:"Total REB",
            toolText:"Total Rebounds - A rebound occurs when a player recovers the ball after a missed shot. This statistic is the number of total rebounds a player or team has collected on either offense or defense."
        }]
        },{
        cat:"TeamTrackingDrivesStats",
        heading:"Drives",
        url:"drives",
        definition:"Statistics related to drives to the basket -- any touch that starts at least 20 feet of the hoop and is dribbled within 10 feet of the hoop, excluding fast breaks.",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"DPP",
            title:"Points Per Game on Drives",
            format:"number",
            param:2,
            toolText:"Points Per Game on Drives - The number of points a teams player that drives has accumulated on drives to the basket."
        },{
            val:"DTP",
            title:"Team Points Per Game on Drives",
            format:"number",
            param:2,
            toolText:"Team Points Per Game on Drives - The number of points per game a team has accumulated on drives to the basket by a player."
        },{
            val:"DPP_TOT",
            title:"Total Points on Drives",
            toolText:"Total Points Per Game on Drives - The total number of points a team has accumulated on drives to the basket by a player."
        }]
        },{
        cat:"TeamTrackingCatchShootStats",
        heading:"Catch and Shoot",
        url:"catchshoot",
        definition:" Statistics related to any jump shot outside of 10 feet where a player possessed the ball for 2 seconds or less and took no dribbles.",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"PTS",
            title:"Pullup Shots Points Per Game",
            format:"number",
            param:2,
            toolText:"Catch and Shoot Points Per Game - The number of points scored per game on Catch and Shoot opportunities."
        },{
            val:"FG3M",
            title:"Pullup Shots 3FGM Per Game",
            format:"number",
            param:2,
            toolText:"Catch and Shoot 3FGM Per Game - The number of 3 Point Field Goals made per game on Catch and Shoot opportunities."
        },{
            val:"PTS_TOT",
            title:"Total Pullup Shots PTS",
            toolText:"Total Catch and Shoot Points - The total number of points scored on Catch and Shoot opportunities."
        }]
        },{
        cat:"TeamTrackingPullUpShootStats",
        heading:"Pullup Shooting",
        url:"pullup",
        definition:"Statistics related to any jump shot outside 10 feet where a player took 1 or more dribbles before shooting",
        stats:[{
            val:"TEAM_ID",
            title:""
        },{
            val:"TEAM_NAME",
            title:"Team"
        },{
            val:"PTS",
            title:"Pullup Shots Points Per Game",
            format:"number",
            param:2,
            toolText:"Pullup Shots Points Per Game - The number of points scored per game on Pull Up Shot opportunities."
        },{
            val:"FG3M",
            title:"Pullup Shots 3FGM Per Game",
            format:"number",
            param:2,
            toolText:"Pullup Shots 3FGM Per Game - The number of 3 Point Field Goals made per game on Pull Up Shot opportunities."
        },{
            val:"PTS_TOT",
            title:"Total Pullup Shots PTS",
            toolText:"Total Pullup Shots PTS - The total number of points scored on Pull Up Shot opportunities."
        }]
        }]
    };

function getStats(){
    $scope.isLoading=true;
    $scope.datasets={};

    var url="/js/data/sportvu/"+$scope.params.Season.substr(0,4)+"/allCategories"+($scope.Section=="team"?"Team":"")+"TopFive"+($scope.params.SeasonType=="Playoffs"?"Post":"")+".json";
    $http({
        method:"GET",
        url:url
    }).then(function(response){
        var data=response.data;
        var cats=$scope.categories[$scope.Section];
        for(var i in data){
            StatsRequest.parse(data[i]);
            for(var j in cats){
                if(data[i].resultSets[0].name==cats[j].cat){
                    cats[j].numbers=[];
                    cats[j].dataset=data[i].resultSets[0];
                    for(var k in cats[j].dataset.datatable){
                        var browSet=[];
                        for(var l=0,len=cats[j].stats.length;l<len;l++){
                            var figure=cats[j].dataset.datatable[k][cats[j].stats[l].val];
                            if(cats[j].stats[l].format){
                                figure=$filter(cats[j].stats[l].format)(figure,cats[j].stats[l].param)
                                }
                                browSet.push(figure)
                            }
                            cats[j].numbers.push(browSet)
                        }
                    }
                    }
            $scope.datasets=cats
        }
        $scope.isLoading=false
    })
}
$http.get("/frags/stats-site-page-player-tracking-more-list.html").then(function(resp){
    $scope.moreStats=$sce.trustAsHtml(resp.data)
    });
$scope.onrunit=function(){
    getStats()
    };

$scope.$watch("Section",function(Section){
    if(!Section){
        return
    }
    getStats()
    })
}]);
stats.controller("TrackingSectionCtrl",["$scope","$routeParams",function($scope,$routeParams){
    "use strict";
    $scope.$on("$routeChangeSuccess",function(event,routeData){
        if(!$routeParams.Section){
            return
        }
        $scope.Section=$routeParams.Section
        })
    }]);
stats.controller("TransactionsCtrl",function($scope,$location,$http,SEASON_CONFIG,TEAMS,Splits,$timeout){
    "use strict";
    $scope.isLoading=true;
    $scope.showSplits=false;
    var seasonType=SEASON_CONFIG.transactions;
    $scope.Teams=Splits.get(["OpponentTeamID"]).OpponentTeamID;
    $scope.Teams.options[0].text="All Teams";
    $scope.Seasons=Splits.get([{
        name:"Season",
        initial:seasonType.Season,
        seasonRange:[seasonType.SeasonYearFrom,seasonType.SeasonYear]
        }]).Season;
    var data=[];
    $scope.onrunit=function(){
        var tempData=[];
        var dateTo="6/30/20";
        var dateFrom="7/1/20";
        var selectedSeason=$scope.Seasons.selected.val;
        var selectedDateDigits=selectedSeason.slice(-2);
        var teamSelected=$scope.Teams.selected.val;
        var dt=Date.parse(dateTo+selectedDateDigits);
        var df=Date.parse(dateFrom+(parseInt(selectedDateDigits)-1));
        var d;
        for(var i=0,len=data.length;i<len;i++){
            var transactionStamp=Date.parse(data[i].TransactionDate);
            d=transactionStamp;
            for(var j in data[i].Team){
                if(data[i].Team[j]===teamSelected&&df<d&&d<dt||teamSelected==="0"&&df<d&&d<dt){
                    tempData.push(data[i])
                    }
                }
            }
            var dateGroups=groupDates(tempData);
    for(var v in dateGroups){
    dateGroups[v].transactions=getRows(dateGroups[v].transactions,2)
    }
    $scope.dateGroups=dateGroups;
$scope.wait=20;
addToDom();
    $scope.$watch("wait",function(){
    if($scope.wait>$scope.dateGroups.length/10){
        $scope.lazyLoading=true;
        $scope.isLoading=false
        }
        if($scope.wait>$scope.dateGroups.length){
        $timeout.cancel(stopped);
        $scope.lazyLoading=false
        }
    })
};

var stopped;
var addToDom=function(){
    $scope.isLoading=true;
    stopped=$timeout(function(){
        $scope.isLoading=false;
        $scope.wait+=5;
        addToDom()
        },1e3)
    };

var getRows=function(array,columns){
    var rows=[];
    var i,j,temparray,chunk=columns;
    for(i=0,j=array.length;i<j;i+=chunk){
        temparray=array.slice(i,i+chunk);
        rows.push(temparray)
        }
        return rows
    };

var groupDates=function(array){
    var tempArray=[];
    for(var i=0,len=array.length;i<len;i++){
        var oneUnder=array[i-1];
        var thisDate=array[i];
        if(oneUnder&&thisDate.TransactionDate==oneUnder.TransactionDate){
            tempObject.transactions.push(array[i-1]);
            tempObject.transactions=$.unique(tempObject.transactions)
            }else{
            var tempObject={
                date:"",
                transactions:[]
            };

            tempObject.date=thisDate.TransactionDate;
            tempObject.transactions.push(thisDate);
            tempArray.push(tempObject)
            }
        }
    return tempArray
};

$http.get("/feeds/NBAPlayerTransactions-559107/json.js").then(function(resp){
    var listItems=resp.data.ListItems;
    for(var i=0,len=listItems.length;i<len;i++){
        var transactionStamp=Date.parse(listItems[i].TransactionDate);
        listItems[i].Players=listItems[i].Players.split(",");
        var tempArray=[];
        for(var j=0,len2=listItems[i].Players.length;j<len2;j++){
            var player={};

            player.Id=listItems[i].Players[j];
            player.isShown=false;
            if(j===0){
                player.isShown=true
                }
                tempArray.push(player)
            }
            listItems[i].Players=tempArray;
        listItems[i].Team=listItems[i].Team.split(",");
        listItems[i].TeamAbbr=[];
        for(var j in listItems[i].Team){
            for(var k in TEAMS){
                if(listItems[i].Team[j]===TEAMS[k].id){
                    listItems[i].TeamAbbr.push(TEAMS[k].abbr)
                    }
                }
            }
        }
    data=listItems;
$scope.onrunit()
});
$scope.togglePlayer=function(player,array){
    for(var i=0,len=array.length;i<len;i++){
        array[i].isShown=false
        }
        player.isShown=true
    }
});
stats.controller("VsSummaryCtrl",["$scope","$location","$routeParams","StatsRequest","$filter","TEAMS","SEASON_CONFIG","Splits","$q",function($scope,$location,$routeParams,StatsRequest,$filter,TEAMS,SEASON_CONFIG,Splits,$q){
    "use strict";
    $scope.isLoading=true;
    $scope.limit=5;
    $scope.params={
        Season:SEASON_CONFIG.playerVsPlayerStats.Season,
        LeagueID:"00",
        IsOnlyCurrentSeason:"0",
        SeasonType:"Regular Season"
    };

    $scope.compare={
        isReady:false,
        left:{
            type:"",
            hasPlayer:false,
            hasTeam:false,
            hasLineup:false,
            isLoading:true,
            lineup:[],
            lineupChosen:[],
            lineupIDs:[],
            lineupShow:false,
            info:{},
            checked:0
        },
        right:{
            type:"",
            hasPlayer:false,
            hasTeam:false,
            hasLineup:false,
            isLoading:true,
            lineup:[],
            lineupShow:false,
            lineupChosen:[],
            lineupIDs:[],
            info:{},
            checked:0
        }
    };

var teams=TEAMS.slice(0);
    function filterByTeamId(n){
    for(var i=0,len=teams.length;i<len;i++){
        if(n==teams[i].id){
            return teams[i]
            }
        }
    }
function getTeams(){
    var filterTeamForConference=function(n){
        return n.conference==this
        };

    $scope.conferences=[{
        name:"Eastern",
        teams:teams.filter(filterTeamForConference.bind("Eastern"))
        },{
        name:"Western",
        teams:teams.filter(filterTeamForConference.bind("Western"))
        }]
    }
    $scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    function getAllPlayers(){
    StatsRequest.get("playerList","",$scope.params).then(function(){
        var playersAll=StatsRequest.getData().CommonAllPlayers.datatable;
        var playersActive=$filter("filter")(playersAll,{
            ROSTERSTATUS:1
        });
        $scope.players=playersActive;
        $scope.isLoading=false
        })
    }
    function getLineupInfo(team,side){
    var defer=$q.defer();
    $scope.params.TeamID=team;
    side.hasPlayer=false;
    side.hasTeam=false;
    StatsRequest.get("teamCommonRoster","",$scope.params).then(function(){
        var dataset=StatsRequest.getData();
        side.lineup=dataset.CommonTeamRoster.datatable;
        side.lineupShow=true;
        side.lineupTeam=team;
        defer.resolve(side.lineup)
        });
    return defer.promise
    }
    function getPlayerInfo(side){
    var defer=$q.defer();
    StatsRequest.get("playerSummary","",$scope.params).then(function(){
        $scope.params.PerMode="Totals";
        var datasets=StatsRequest.getData();
        side.info=datasets.CommonPlayerInfo.datatable[0];
        $scope.isLoading=false;
        side.hasPlayer=true;
        side.team=filterByTeamId(side.info.TEAM_ID);
        side.type="player";
        $scope.params.PlayerID=side.info.PERSON_ID;
        defer.resolve()
        });
    return defer.promise
    }
    $scope.switchSides=function(){
    var tempObj=$scope.compare.left;
    $scope.compare.left=$scope.compare.right;
    $scope.compare.right=tempObj
    };

$scope.setStatType=function(stat,side){
    side.type=stat;
    side.lineup=[];
    side.lineupChosen=[];
    side.lineupIDs=[];
    side.checked=0;
    side.hasTeam=false;
    side.hasLineup=false;
    side.hasPlayer=false;
    $scope.compare.isReady=false
    };

$scope.setTeam=function(team,side){
    var defer=$q.defer();
    side.info=team;
    side.type="team";
    side.hasTeam=true;
    side.isReady=true;
    defer.resolve();
    return defer.promise
    };

$scope.setLineup=function(side){
    side.lineupShow=false;
    side.hasLineup=true;
    side.isReady=true;
    side.type="lineup"
    };

$scope.chooseLineup=function(team,side){
    side.lineup=[];
    getLineupInfo(team,side);
    side.lineupShow=true;
    side.team=team
    };

$scope.checkChange=function(item,side){
    if(item.selected){
        side.checked++;
        side.lineupChosen.push(item);
        side.lineupIDs.push(item.PLAYER_ID)
        }else{
        side.checked--;
        side.lineupChosen.pop();
        side.lineupIDs.pop()
        }
    };

$scope.onSelect=function($item,$model,$label,side){
    $scope.$item=$item;
    $scope.$model=$model;
    $scope.$label=$label;
    $scope.params.PlayerID=$scope.$model.PERSON_ID;
    getPlayerInfo(side);
    side.lineupRoutes=[];
    side.info=$scope.$model;
    side.info.paramID=$scope.params.PlayerID;
    side.isReady=true
    };

$scope.$watch("compare",function(){
    var search={};

    if($scope.compare.left.hasTeam&&$scope.compare.right.hasPlayer){
        $scope.compare.isReady=true;
        search={
            TeamID:$scope.compare.left.info.id,
            VsPlayerID:$scope.compare.right.info.PERSON_ID,
            range:[$scope.compare.right.info.FROM_YEAR,SEASON_CONFIG.playerStats.SeasonYear]
            };

        $location.search(search);
        $scope.search="?"+$location.url().split("?")[1]
        }
        if($scope.compare.left.hasPlayer&&$scope.compare.right.hasPlayer){
        $scope.compare.isReady=true;
        search={
            PlayerID:$scope.compare.left.info.PERSON_ID,
            VsPlayerID:$scope.compare.right.info.PERSON_ID,
            range:[Math.max($scope.compare.left.info.FROM_YEAR,$scope.compare.right.info.FROM_YEAR),SEASON_CONFIG.playerStats.SeasonYear]
            };

        $location.search(search);
        $scope.search="?"+$location.url().split("?")[1]
        }
        if($scope.compare.left.hasLineup&&$scope.compare.right.hasPlayer){
        $scope.compare.isReady=true;
        search={
            VsLineupID:[$scope.compare.right.info.PERSON_ID],
            LineupID:$scope.compare.left.lineupIDs,
            VsLineupTeam:$scope.compare.right.info.TEAM_ID,
            LineupTeam:$scope.compare.left.team,
            range:SEASON_CONFIG.playerStats.SeasonYear
            };

        $location.search(search);
        $scope.search="?"+$location.url().split("?")[1]
        }
    },true);
$scope.$on("$locationChangeStart",function(){
    var TeamID=$location.search().TeamID;
    var PlayerID=$location.search().PlayerID;
    var VsPlayerID=$location.search().VsPlayerID;
    if(!$scope.compare.isReady){
        if($location.search().PlayerID&&$location.search().VsPlayerID){
            $scope.params.PlayerID=$location.search().PlayerID;
            getPlayerInfo($scope.compare.left).then(function(){
                $scope.params.PlayerID=$location.search().VsPlayerID;
                getPlayerInfo($scope.compare.right).then(function(){
                    $scope.compare.isReady=true
                    })
                });
            return
        }
        if($location.search().TeamID&&$location.search().VsPlayerID){
            var sideTeam=filterByTeamId($location.search().TeamID);
            $scope.setTeam(sideTeam,$scope.compare.left).then(function(){
                $scope.params.PlayerID=$location.search().VsPlayerID;
                getPlayerInfo($scope.compare.right).then(function(){
                    $scope.compare.isReady=true
                    })
                });
            return
        }
        if(PlayerID){
            $scope.params.PlayerID=PlayerID;
            getPlayerInfo($scope.compare.left)
            }
            if(TeamID){
            var sideTeam=filterByTeamId(TeamID);
            $scope.setTeam(sideTeam,$scope.compare.left)
            }
        }
});
$scope.pages=[{
    value:"/advanced/",
    text:"Advanced"
},{
    value:"/misc/",
    text:"Misc"
},{
    value:"/scoring/",
    text:"Scoring"
},{
    value:"/fourfactors/",
    text:"Four Factors"
},{
    value:"/opponent/",
    text:"Opponent"
}];
$scope.onNavChange=function(){
    var selectedLink=$("#section-links option:selected").val();
    $location.path(selectedLink)
    };

getAllPlayers();
getTeams()
}]);
stats.controller("PlayerVsPlayerAdvancedCtrl",["$scope","$location","Splits","PlayerVersusService","SEASON_CONFIG",function($scope,$location,Splits,PlayerVersusService,SEASON_CONFIG){
    "use strict";
    var splits=[{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:$location.search().range
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.playerStats.SeasonType,
        without:["Preseason"]
        },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"];
    $scope.splits=Splits.get(splits);
    $scope.params={
        MeasureType:"Advanced",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"Totals",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:""
    };

    $scope.showCol={
        MIN:{
            visible:false,
            index:0,
            label:"MIN",
            format:"number"
        },
        OFF_RATING:{
            visible:false,
            index:1,
            label:"OFF RATING",
            format:"number"
        },
        DEF_RATING:{
            visible:false,
            index:2,
            label:"DEF RATING",
            format:"number"
        },
        NET_RATING:{
            visible:true,
            index:3,
            label:"NET RATING",
            format:"number"
        },
        AST_PCT:{
            visible:false,
            index:4,
            label:"AST %",
            format:"percent"
        },
        AST_TO:{
            visible:false,
            index:5,
            label:"AST TO",
            format:"number"
        },
        AST_RATIO:{
            visible:true,
            index:6,
            label:"AST RATIO",
            format:"number"
        },
        OREB_PCT:{
            visible:false,
            index:7,
            label:"OREB %",
            format:"percent"
        },
        DREB_PCT:{
            visible:false,
            index:8,
            label:"DREB %",
            format:"percent"
        },
        REB_PCT:{
            visible:true,
            index:9,
            label:"REB %",
            format:"percent"
        },
        TM_TOV_PCT:{
            visible:false,
            index:10,
            label:"TO RATIO",
            format:"percent"
        },
        EFG_PCT:{
            visible:true,
            index:11,
            label:"EFG %",
            format:"percent"
        },
        TS_PCT:{
            visible:false,
            index:12,
            label:"TS %",
            format:"percent"
        },
        USG_PCT:{
            visible:false,
            index:13,
            label:"USG %",
            format:"percent"
        },
        PACE:{
            visible:false,
            index:14,
            label:"PACE",
            format:"number"
        },
        PIE:{
            visible:true,
            index:15,
            label:"PIE",
            format:"percent"
        }
    };

$scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    $scope.onrunit=function(){
    $location.search().Split=[];
    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            $location.search().Split.push(val)
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        PlayerVersusService.getStats($scope);
    $location.search()
    };

$scope.$watch("compare",function(){
    if($scope.compare.isReady){
        PlayerVersusService.getStats($scope);
        splits[0].seasonRange=$location.search().range;
        $scope.splits=Splits.get(splits)
        }
    },true)
}]);
stats.controller("PlayerVsPlayerFourFactorsCtrl",["$scope","$location","Splits","PlayerVersusService","SEASON_CONFIG",function($scope,$location,Splits,PlayerVersusService,SEASON_CONFIG){
    "use strict";
    var splits=[{
        name:"Season",
        initial:SEASON_CONFIG.teamStats.Season
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.teamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[]
    },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"];
    $scope.splits=Splits.get(splits);
    $scope.params={
        MeasureType:"Four Factors",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:"PerGame",
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:""
    };

    $scope.showCol={
        MIN:{
            visible:false,
            index:0,
            label:"MIN",
            format:"number"
        },
        EFG_PCT:{
            visible:true,
            index:1,
            label:"EFG %",
            format:"percent"
        },
        FTA_RATE:{
            visible:true,
            index:2,
            label:"FTA RT",
            format:"number"
        },
        TM_TOV_PCT:{
            visible:true,
            index:3,
            label:"TM TV %",
            format:"percent"
        },
        OREB_PCT:{
            visible:true,
            index:4,
            label:"OREB %",
            format:"percent"
        },
        OPP_EFG_PCT:{
            visible:true,
            index:5,
            label:"OPP EFG %",
            format:"percent"
        },
        OPP_FTA_RATE:{
            visible:true,
            index:6,
            label:"OPP FTA RT",
            format:"number"
        },
        OPP_TOV_PCT:{
            visible:true,
            index:7,
            label:"OPP FTM",
            format:"percent"
        },
        OPP_OREB_PCT:{
            visible:false,
            index:8,
            label:"OPP FTA",
            format:"percent"
        }
    };

$scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    $scope.onrunit=function(){
    $location.search().Split=[];
    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            $location.search().Split.push(val)
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        PlayerVersusService.getStats($scope);
    $location.search()
    };

$scope.$watch("compare",function(){
    if($scope.compare.isReady){
        if($scope.compare.left.type=="player"){
            $location.path("/");
            return
        }
        PlayerVersusService.getStats($scope);
        splits[0].seasonRange=$location.search().range;
        $scope.splits=Splits.get(splits)
        }
    },true)
}]);
stats.controller("PlayerVsPlayerOpponentCtrl",["$scope","$location","Splits","PlayerVersusService","SEASON_CONFIG",function($scope,$location,Splits,PlayerVersusService,SEASON_CONFIG){
    "use strict";
    var splits=[{
        name:"Season",
        initial:SEASON_CONFIG.teamStats.Season
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.teamStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"];
    $scope.splits=Splits.get(splits);
    $scope.params={
        MeasureType:"Opponent",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:""
    };

    $scope.showCol={
        MIN:{
            visible:false,
            index:0,
            label:"MIN",
            format:"number"
        },
        OPP_FGM:{
            visible:false,
            index:1,
            label:"OPP FGM",
            format:"number"
        },
        OPP_FGA:{
            visible:false,
            index:2,
            label:"OPP FGA",
            format:"number"
        },
        OPP_FG_PCT:{
            visible:true,
            index:3,
            label:"OPP FG%",
            format:"percent"
        },
        OPP_FG3M:{
            visible:false,
            index:4,
            label:"OPP 3PM",
            format:"number"
        },
        OPP_FG3A:{
            visible:false,
            index:5,
            label:"OPP 3PA",
            format:"number"
        },
        OPP_FG3_PCT:{
            visible:true,
            index:6,
            label:"OPP 3P%",
            format:"percent"
        },
        OPP_FTM:{
            visible:false,
            index:7,
            label:"OPP FTM",
            format:"number"
        },
        OPP_FTA:{
            visible:false,
            index:8,
            label:"OPP FTA",
            format:"number"
        },
        OPP_FT_PCT:{
            visible:true,
            index:9,
            label:"OPP FT%",
            format:"percent"
        },
        OPP_OREB:{
            visible:false,
            index:10,
            label:"OPP OREB",
            format:"number"
        },
        OPP_DREB:{
            visible:false,
            index:11,
            label:"OPP DREB",
            format:"number"
        },
        OPP_REB:{
            visible:true,
            index:12,
            label:"OPP REB",
            format:"number"
        },
        OPP_AST:{
            visible:true,
            index:13,
            label:"OPP AST",
            format:"number"
        },
        OPP_TOV:{
            visible:false,
            index:14,
            label:"OPP TOV",
            format:"number"
        },
        OPP_STL:{
            visible:true,
            index:15,
            label:"OPP STL",
            format:"number"
        },
        OPP_BLK:{
            visible:true,
            index:16,
            label:"OPP BLK",
            format:"number"
        },
        OPP_PF:{
            visible:false,
            index:17,
            label:"OPP PF",
            format:"number"
        },
        OPP_PTS:{
            visible:false,
            index:18,
            label:"OPP PTS",
            format:"number"
        }
    };

$scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    $scope.onrunit=function(){
    $location.search().Split=[];
    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            $location.search().Split.push(val)
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        PlayerVersusService.getStats($scope);
    $location.search()
    };

$scope.$watch("compare",function(){
    if($scope.compare.isReady){
        if($scope.compare.left.type=="player"){
            $location.path("/");
            return
        }
        PlayerVersusService.getStats($scope);
        splits[0].seasonRange=$location.search().range;
        $scope.splits=Splits.get(splits)
        }
    },true)
}]);
stats.controller("PlayerVsPlayerBaseCtrl",["$scope","$location","Splits","PlayerVersusService","SEASON_CONFIG",function($scope,$location,Splits,PlayerVersusService,SEASON_CONFIG){
    "use strict";
    var splits=[{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:$location.search().seasonRange
        },{
        name:"SeasonType",
        without:["Pre Season"]
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        }];
    $scope.splits=Splits.get(splits);
    $scope.params={
        MeasureType:"Base",
        LeagueID:"00",
        TeamID:$location.search().VsTeamID,
        PlayerTeamID:0,
        PlayerID1:0,
        PlayerID2:0,
        PlayerID3:0,
        PlayerID4:0,
        PlayerID5:0,
        VsPlayerID1:0,
        VsPlayerID2:0,
        VsPlayerID3:0,
        VsPlayerID4:0,
        VsPlayerID5:0,
        VsTeamID:0,
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:"N",
        PaceAdjust:"N",
        Rank:"N",
        Outcome:"",
        Location:"",
        Month:0,
        SeasonSegment:"",
        OpponentTeamID:0,
        VsConference:"",
        VsDivision:"",
        GameSegment:"",
        Period:0,
        LastNGames:0,
        DateFrom:"",
        DateTo:""
    };

    $scope.showCol={
        MIN:{
            visible:false,
            index:0,
            label:"MIN",
            format:"number"
        },
        FGM:{
            visible:false,
            index:1,
            label:"FGM",
            format:"number"
        },
        FGA:{
            visible:false,
            index:2,
            label:"FGA",
            format:"number"
        },
        FG_PCT:{
            visible:false,
            index:3,
            label:"FG%",
            format:"percent"
        },
        FG3M:{
            visible:false,
            index:4,
            label:"3PM",
            format:"number"
        },
        FG3A:{
            visible:false,
            index:5,
            label:"3PA",
            format:"number"
        },
        FG3_PCT:{
            visible:false,
            index:6,
            label:"3P%",
            format:"percent"
        },
        FTM:{
            visible:false,
            index:7,
            label:"FTM",
            format:"number"
        },
        FTA:{
            visible:false,
            index:8,
            label:"FTA",
            format:"number"
        },
        FT_PCT:{
            visible:false,
            index:9,
            label:"FT%",
            format:"percent"
        },
        OREB:{
            visible:false,
            index:10,
            label:"OREB",
            format:"number"
        },
        DREB:{
            visible:false,
            index:11,
            label:"DREB",
            format:"number"
        },
        REB:{
            visible:true,
            index:12,
            label:"REB",
            format:"number"
        },
        AST:{
            visible:true,
            index:13,
            label:"AST",
            format:"number"
        },
        TOV:{
            visible:false,
            index:14,
            label:"TOV",
            format:"number"
        },
        STL:{
            visible:true,
            index:15,
            label:"STL",
            format:"number"
        },
        BLK:{
            visible:true,
            index:16,
            label:"BLK",
            format:"number"
        },
        PF:{
            visible:false,
            index:17,
            label:"PF",
            format:"number"
        },
        PTS:{
            visible:true,
            index:18,
            label:"PTS",
            format:"number"
        }
    };

$scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    $scope.onrunit=function(){
    $location.search().Split=[];
    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            $location.search().Split.push(val)
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        PlayerVersusService.getStats($scope);
    $location.search()
    };

$scope.$watch("compare",function(){
    if($scope.compare.isReady){
        PlayerVersusService.getStats($scope);
        splits[0].seasonRange=$location.search().range;
        $scope.splits=Splits.get(splits)
        }
    },true);
$scope.$on("$locationChangeStart",function(){})
    }]);
stats.controller("PlayerVsPlayerMiscCtrl",["$scope","$location","Splits","PlayerVersusService","SEASON_CONFIG",function($scope,$location,Splits,PlayerVersusService,SEASON_CONFIG){
    "use strict";
    var splits=[{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:$location.search().SeasonRange
        },{
        name:"PerMode",
        include:[{
            val:"Per100Possessions",
            text:"Per 100 Poss"
        },{
            val:"Per100Plays",
            text:"Per 100 Plays"
        },{
            val:"Per48",
            text:"Per 48 Minutes"
        },{
            val:"Per40",
            text:"Per 40 Minutes"
        },{
            val:"Per36",
            text:"Per 36 Minutes"
        },{
            val:"PerMinute",
            text:"Per 1 Minute"
        },{
            val:"PerPossession",
            text:"Per 1 Poss"
        },{
            val:"PerPlay",
            text:"Per 1 Play"
        },{
            val:"MinutesPer",
            text:"Minutes Per"
        }]
        },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames","SeasonType"];
    $scope.splits=Splits.get(splits);
    $scope.params={
        MeasureType:"Misc",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:""
    };

    $scope.showCol={
        MIN:{
            visible:false,
            index:0,
            label:"MIN",
            format:"number"
        },
        PTS_OFF_TOV:{
            visible:true,
            index:1,
            label:"PTS OFF TOV",
            format:"number"
        },
        PTS_2ND_CHANCE:{
            visible:true,
            index:2,
            label:"PTS 2ND CHANCE",
            format:"number"
        },
        PTS_FB:{
            visible:true,
            index:3,
            label:"PTS FB",
            format:"number"
        },
        PTS_PAINT:{
            visible:false,
            index:4,
            label:"PTS PAINT",
            format:"number"
        },
        OPP_PTS_OFF_TOV:{
            visible:false,
            index:5,
            label:"OPP PTS OFF TOV",
            format:"number"
        },
        OPP_PTS_2ND_CHANCE:{
            visible:false,
            index:6,
            label:"OPP PTS 2ND CHANCE",
            format:"number"
        },
        OPP_PTS_FB:{
            visible:false,
            index:7,
            label:"OPP PTS FB",
            format:"number"
        },
        OPP_PTS_PAINT:{
            visible:true,
            index:8,
            label:"OPP PTS PAINT",
            format:"number"
        },
        BLK:{
            visible:false,
            index:9,
            label:"BLK",
            format:"number"
        },
        BLKA:{
            visible:false,
            index:10,
            label:"BLKA",
            format:"number"
        },
        PF:{
            visible:false,
            index:11,
            label:"PF",
            format:"number"
        },
        PFD:{
            visible:false,
            index:12,
            label:"PFD",
            format:"number"
        }
    };

$scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    $scope.onrunit=function(){
    $location.search().Split=[];
    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            $location.search().Split.push(val)
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        PlayerVersusService.getStats($scope);
    $location.search()
    };

$scope.$watch("compare",function(){
    if($scope.compare.isReady){
        PlayerVersusService.getStats($scope);
        splits[0].seasonRange=$location.search().range;
        $scope.splits=Splits.get(splits)
        }
    },true)
}]);
stats.controller("PlayerVsPlayerScoringCtrl",["$scope","$location","Splits","PlayerVersusService","SEASON_CONFIG",function($scope,$location,Splits,PlayerVersusService,SEASON_CONFIG){
    "use strict";
    var splits=[{
        name:"Season",
        initial:SEASON_CONFIG.leaguePlayerStats.Season,
        seasonRange:$location.search().range
        },{
        name:"SeasonType",
        initial:SEASON_CONFIG.playerStats.SeasonType,
        without:["Preseason"]
        },{
        name:"PerMode",
        include:[]
    },"PlusMinus","PaceAdjust","Rank","Outcome","Location","Month","SeasonSegment","OpponentTeamID","VsConference","VsDivision","GameSegment","Period","LastNGames"];
    $scope.splits=Splits.get(splits);
    $scope.params={
        MeasureType:"Scoring",
        LeagueID:"00",
        Season:$scope.splits.Season.selected.val,
        SeasonType:$scope.splits.SeasonType.selected.val,
        PerMode:$scope.splits.PerMode.selected.val,
        PlusMinus:$scope.splits.PlusMinus.selected.val,
        PaceAdjust:$scope.splits.PaceAdjust.selected.val,
        Rank:$scope.splits.Rank.selected.val,
        Outcome:$scope.splits.Outcome.selected.val,
        Location:$scope.splits.Location.selected.val,
        Month:$scope.splits.Month.selected.val,
        SeasonSegment:$scope.splits.SeasonSegment.selected.val,
        OpponentTeamID:$scope.splits.OpponentTeamID.selected.val,
        VsConference:$scope.splits.VsConference.selected.val,
        VsDivision:$scope.splits.VsDivision.selected.val,
        GameSegment:$scope.splits.GameSegment.selected.val,
        Period:$scope.splits.Period.selected.val,
        LastNGames:$scope.splits.LastNGames.selected.val,
        DateFrom:"",
        DateTo:""
    };

    $scope.showCol={
        MIN:{
            visible:false,
            index:0,
            label:"MIN",
            format:"number"
        },
        PCT_FGA_2PT:{
            visible:false,
            index:1,
            label:"% FGA 2PT",
            format:"percent"
        },
        PCT_FGA_3PT:{
            visible:false,
            index:2,
            label:"% FGA 3PT",
            format:"percent"
        },
        PCT_PTS_2PT:{
            visible:false,
            index:3,
            label:"% PTS 2PT",
            format:"percent"
        },
        PCT_PTS_2PT_MR:{
            visible:true,
            index:4,
            label:"% PTS 2PT MR",
            format:"percent"
        },
        PCT_PTS_3PT:{
            visible:true,
            index:5,
            label:"% PTS 3PT",
            format:"percent"
        },
        PCT_PTS_FB:{
            visible:true,
            index:6,
            label:"% PTS FB",
            format:"percent"
        },
        PCT_PTS_FT:{
            visible:true,
            index:7,
            label:"% PTS FT",
            format:"percent"
        },
        PCT_PTS_OFF_TOV:{
            visible:false,
            index:8,
            label:"% PTS OFF TOV",
            format:"percent"
        },
        PCT_PTS_PAINT:{
            visible:true,
            index:9,
            label:"% PTS PAINT",
            format:"percent"
        },
        PCT_AST_2PM:{
            visible:false,
            index:10,
            label:"% AST 2PM",
            format:"percent"
        },
        PCT_UAST_2PM:{
            visible:false,
            index:11,
            label:"% UAST 2PM",
            format:"percent"
        },
        PCT_AST_3PM:{
            visible:false,
            index:12,
            label:"% AST 3PM ",
            format:"percent"
        },
        PCT_UAST_3PM:{
            visible:false,
            index:13,
            label:"% UAST 3PM",
            format:"percent"
        },
        PCT_AST_FGM:{
            visible:false,
            index:14,
            label:"% AST FGM",
            format:"percent"
        },
        PCT_UAST_FGM:{
            visible:false,
            index:15,
            label:"% UAST FGM",
            format:"percent"
        }
    };

$scope.columns=[];
for(var i in $scope.showCol){
    $scope.showCol[i].name=i;
    $scope.columns.push($scope.showCol[i])
    }
    $scope.onrunit=function(){
    $location.search().Split=[];
    for(var i in $scope.splits){
        var val=$scope.splits[i].selected.val;
        if(val!=$scope.splits[i].default){
            $location.search().Split.push(val)
            }
            $scope.params[i]=$scope.splits[i].selected.val
        }
        PlayerVersusService.getStats($scope);
    $location.search()
    };

$scope.$watch("compare",function(){
    if($scope.compare.isReady){
        PlayerVersusService.getStats($scope);
        splits[0].seasonRange=$location.search().range;
        $scope.splits=Splits.get(splits)
        }
    },true)
}]);
stats.directive("statsCompareBar",["$timeout",function($timeout){
    "use strict";
    return{
        restrict:"AE",
        scope:{
            player:"@",
            vs:"@"
        },
        controller:["$scope","$element",function($scope,$element){
            function setBar(){
                var player=parseFloat($scope.player,10);
                var vs=parseFloat($scope.vs,10);
                var total=player+vs;
                var pct=player/total*80;
                if(pct>80){
                    pct=80
                    }
                    $element.css({
                    width:"0%"
                });
                $timeout(function(){
                    $element.css({
                        width:pct+"%"
                        });
                    if(player>=vs){
                        $element.addClass("leader")
                        }
                    },100)
            }
            $scope.$watch("player",setBar);
        $scope.$watch("vs",setBar)
        }]
    }
}]);
stats.directive("statsCustomFilter",["$filter",function($filter){
    "use strict";
    return{
        restrict:"A",
        replace:true,
        scope:{
            filter:"=",
            fields:"="
        },
        template:["<table>"," <tr>",'   <td class="close"><button ng-click="remove()"><i class="fa fa-times"></i></button></td>','   <td class="field"><select ng-model="field" ng-options="v.text for v in fields"></select></td>','   <td class="comparator"><select ng-model="comparator" ng-options="v.v for v in comparators"></select></td>','   <td class="val"><input type="text" ng-model="value" ng-model-options="{debounce: {default:500, blur:0}  }"></td>'," </tr>","</div>"].join(""),
        controller:["$scope","$element",function($scope,$element){
            $scope.comparators=[{
                k:"E",
                v:"="
            },{
                k:"NE",
                v:"!="
            },{
                k:"G",
                v:">"
            },{
                k:"GE",
                v:">="
            },{
                k:"L",
                v:"<"
            },{
                k:"LE",
                v:"<="
            }];
            $scope.toggled=false;
            $scope.remove=function(){
                $scope.$emit("removeFilter",$scope.filter)
                };

            function initFilter(){
                if(!$scope.fields||!$scope.filter){
                    return
                }
                var s=$scope.filter.value.split("*");
                $scope.field=$filter("filter")($scope.fields,{
                    name:s[0]
                    },true)[0];
                if(!$scope.field){
                    $scope.field=$scope.fields[0]
                    }
                    $scope.comparator=$filter("filter")($scope.comparators,{
                    k:s[1]
                    })[0];
                $scope.value=s[2]
                }
                function setFilter(){
                if(!$scope.field||!$scope.comparator){
                    return
                }
                $scope.filter.value=$scope.field.name+"*"+$scope.comparator.k+"*"+$scope.value;
                $scope.$emit("filterUpdated",$scope.filter)
                }
                $scope.$watch("filter",initFilter);
            $scope.$watch("fields",initFilter);
            $scope.$watch("field",setFilter);
            $scope.$watch("comparator",setFilter);
            $scope.$watch("value",setFilter)
            }]
        }
    }]);
stats.directive("statsCustomFilters",["$filter","$timeout","$location",function($filter,$timeout,$location){
    "use strict";
    function serializeCustomFilter(filters){
        var str=filters.map(function(n){
            return n.value
            }).join("|");
        $location.search("CF",str||null)
        }
        function deserializeCustomFilter(){
        var qs=$location.search().CF;
        if(!qs){
            return[]
            }
            var filters=qs.split("|").map(function(n,i){
            return{
                name:"CF"+i,
                value:n
            }
        });
    return filters
    }
    return{
    restrict:"A",
    replace:false,
    scope:{
        filters:"=",
        fields:"="
    },
    template:['<div class="col-sm-6 col-md-3">',' <button class="add-filter" ng-click="addFilter()"><i class="fa fa-filter"></i> Add A Custom Filter</button>',"</div>",'<div ng-repeat="filter in filters" class="col-sm-6 col-md-3">','   <div stats-custom-filter fields="fields" filter="filter"></div>',"</div>"].join(""),
    controller:["$scope","$element","$document",function($scope,$element,$document){
        if(!$scope.filters){
            $scope.filters=deserializeCustomFilter()
            }
            var maxFilters=5;
        var current=$scope.filters.length;
        $scope.addFilter=function(){
            if($scope.filters.length>=maxFilters){
                return
            }
            current+=1;
            $scope.filters.push({
                name:"CF"+current,
                value:"**"
            });
            $scope.filters=$scope.filters.slice(0)
            };

        $scope.$on("removeFilter",function(event,filter){
            $scope.filters=$filter("filter")($scope.filters,{
                name:"!"+filter.name
                });
            serializeCustomFilter($scope.filters)
            });
        $scope.$on("filterUpdated",function(event,filter){
            $scope.filters=$scope.filters.slice(0);
            serializeCustomFilter($scope.filters)
            });
        $scope.$watch("fields",function(fields){
            $scope.fields=fields
            })
        }]
    }
}]);
stats.directive("statsFilterButton",[function(){
    "use strict";
    return{
        restrict:"E",
        replace:true,
        template:['<div class="filter-button spin" data-ng-class="{toggled: showSplits==true}" data-ng-click="showSplits=!showSplits;">','  <i class="fa fa-gear"></i>',"</div>"].join("")
        }
    }]);
stats.directive("statsLoader",[function(){
    "use strict";
    return{
        restrict:"A",
        replace:true,
        template:['<div data-ng-show="isLoading" class="loader">',' <img src="/media/img/loader.gif" /><br/>',"</div>"].join("")
        }
    }]);
stats.directive("statsModalLink",["$modal",function($modal){
    "use strict";
    return{
        restrict:"A",
        transclude:true,
        template:["<span ng-transclude></span>"],
        link:function(scope,element,attrs){
            element.on("click",function(e){
                e.stopPropagation();
                e.preventDefault();
                var modalInstance=$modal.open({
                    templateUrl:"/templates/overlay/modal.html",
                    controller:"ModalInstanceCtrl",
                    size:"lg",
                    windowClass:attrs.type,
                    resolve:{
                        url:function(){
                            return attrs.href
                            },
                        title:function(){
                            return attrs.title
                            },
                        type:function(){
                            return attrs.type
                            }
                        }
                })
            })
    }
}
}]);
stats.directive("statsImgPlayer",function(){
    "use strict";
    return{
        restrict:"E",
        scope:{
            playerId:"=",
            size:"@",
            type:"@"
        },
        link:function postLink(scope,iElement,iAttrs){
            scope.$watch("playerId",function(playerId){
                var playerImageUrl="";
                var fallbackUrl="";
                if(playerId===undefined){
                    return
                }
                if(scope.type=="action"){
                    if(scope.size=="large"){
                        playerImageUrl="http://stats.nba.com/media/players/700/"+playerId+".png";
                        fallbackUrl="/media/img/no-player_large.png";
                        iElement.html('<img class="'+iAttrs["class"]+'" alt="'+iAttrs["alt"]+'" src="'+playerImageUrl+'">')
                        }else{
                        playerImageUrl="http://stats.nba.com/media/players/170/"+playerId+".png";
                        fallbackUrl="/media/img/no-player_large_half.png";
                        iElement.html('<img class="'+iAttrs["class"]+'" alt="'+iAttrs["alt"]+'" src="'+playerImageUrl+'">')
                        }
                    }else{
                if(scope.size=="large"){
                    playerImageUrl="http://stats.nba.com/media/players/230x185/"+playerId+".png";
                    fallbackUrl="/media/img/no-headshot_large.png";
                    iElement.html('<img class="'+iAttrs["class"]+'" alt="'+iAttrs["alt"]+'" src="'+playerImageUrl+'">')
                    }else{
                    playerImageUrl="http://stats.nba.com/media/players/132x132/"+playerId+".png";
                    fallbackUrl="/media/img/no-headshot_small.png";
                    iElement.html('<img class="'+iAttrs["class"]+'" alt="'+iAttrs["alt"]+'" src="'+playerImageUrl+'">')
                    }
                }
            iElement.find("img").bind("error",function(){
                var $img=angular.element(this);
                $img.attr("src",fallbackUrl);
                iElement.addClass("not-found")
                })
            })
    }
}
});
stats.directive("statsPlayerListRow",["$filter",function($filter){
    "use strict";
    return{
        restrict:"EA",
        scope:{
            letter:"="
        },
        link:function postLink(scope,iElement,iAttrs){
            scope.$watch("letter",function(letter){
                var html="";
                html+='<div class="col-sm-3 player-initial">'+letter.initial+"</div>";
                for(var i=1;i<4;i+=1){
                    html+='<div class="col-sm-3 player-list-column">';
                    var groups=$filter("listColumn")(letter.items,i,3);
                    for(var j in groups){
                        var player=groups[j];
                        var playerStatus=player.ROSTERSTATUS==1?"active":"historic";
                        html+="<div>";
                        if(playerStatus=="active"){
                            html+='<a class="'+playerStatus+'" href="http://www.nba.com/playerfile/'+player.PLAYERCODE+'/">'+player.DISPLAY_LAST_COMMA_FIRST+"</a>"
                            }else{
                            html+='<a class="'+playerStatus+'" href="/player/#!/'+player.PERSON_ID+'/">'+player.DISPLAY_LAST_COMMA_FIRST+"</a>"
                            }
                            html+="</div>"
                        }
                        html+="</div>"
                    }
                    iElement.html(html)
                })
            }
        }
}]);
stats.directive("statsImgPlaylistThumbnail",function(){
    "use strict";
    return{
        restrict:"E",
        scope:{
            videodata:"="
        },
        link:function postLink(scope,iElement,iAttrs){
            scope.$watch("videodata",function(item){
                if(item===undefined){
                    return
                }
                var fallbackUrl="http://stats.nba.com/media/video/thumbs/nothumb.jpg";
                var thumbnailUrl="http://stats.nba.com/media/video/thumbs/"+item.y+""+item.m+""+item.d+"/"+item.ri+"_"+item.ei+".jpg";
                iElement.html('<img class="thumbnail '+iAttrs["class"]+'" alt="'+iAttrs["alt"]+'" src="'+thumbnailUrl+'">');
                iElement.find("img").bind("error",function(){
                    var $img=angular.element(this);
                    $img.attr("src",fallbackUrl);
                    iElement.addClass("not-found")
                    })
                })
            }
        }
});
stats.directive("statsPopup",["$filter","$modal","$timeout","$location",function($filter,$modal,$timeout,$location){
    "use strict";
    return{
        restrict:"EA",
        scope:{
            title:"@",
            placement:"@",
            video:"@",
            shotchart:"@",
            tracking:"@",
            movement:"@",
            field:"@",
            eventid:"@",
            params:"=",
            row:"=",
            ai:"="
        },
        templateUrl:"/templates/lib/stats-popup.html",
        link:function postLink(scope,iElement,iAttrs){
            var params=angular.extend({
                CFID:scope.row.CFID||"",
                CFPARAMS:scope.row.CFPARAMS||"",
                PlayerID:scope.row.PLAYER_ID||"0",
                TeamID:scope.row.TEAM_ID||"0",
                GameID:scope.row.GAME_ID||scope.row.Game_ID||"",
                ContextMeasure:scope.field,
                Season:"",
                SeasonType:""
            },scope.params);
            var section=document.location.pathname.split("/")[1];
            var title="";
            switch(section){
                case"game":
                    if(scope.ai){
                    title+=(scope.row.PLAYER_NAME||scope.row.TEAM_CITY+" "+scope.row.TEAM_NAME)+" "+scope.field+" during "+scope.ai.gamename+" - "+scope.ai.gamedate
                    }
                    break;
                case"leaders":
                    title+=scope.row.PLAYER+" "+scope.field+" during "+params.Season+" "+params.SeasonType;
                    break;
                case"league":
                    params.CFID="";
                    params.CFPARAMS="";
                    title+=(scope.row.PLAYER_NAME||scope.row.TEAM_NAME)+" "+scope.field+" during "+params.Season+" "+params.SeasonType;
                    if(scope.params.ClutchTime){
                        title+=" - "+scope.params.AheadBehind+" in the "+scope.params.ClutchTime+" by "+scope.params.PointDiff+" points or less"
                        }
                        break;
                case"team":
                    if(scope.ai){
                    if(scope.row.PLAYER_NAME){
                        title+=" ("+scope.row.PLAYER_NAME+") "
                        }
                        title+=scope.ai.TEAM_CITY+" "+scope.ai.TEAM_NAME+" "+scope.field+" during "+params.Season+" "+params.SeasonType;
                    if(scope.row.MATCHUP){
                        title+=" ("+scope.row.GAME_DATE+" "+scope.row.MATCHUP+")"
                        }
                        if(scope.row.CFPARAMS){
                        title+=" ("+scope.row.CFPARAMS+")"
                        }
                    }
                break;
            case"player":
                if(scope.ai){
                title+=scope.ai.DISPLAY_FIRST_LAST+" "+scope.field+" during "+params.Season+" "+params.SeasonType;
                if(scope.row.MATCHUP){
                    title+=" ("+scope.row.GAME_DATE+" "+scope.row.MATCHUP+")"
                    }
                    if(scope.row.CFPARAMS){
                    title+=" ("+scope.row.CFPARAMS+")"
                    }
                }
            break;
        case"vs":
            title+=scope.row.GROUP_VALUE+" "+scope.field+" during "+params.Season+" "+params.SeasonType;
            if(params.PlayerID==="0"){
            params.CFID=""
            }else{
            params.CFID="";
            params.TeamID="0"
            }
            break;
        case"default":
            title+="";
            break
            }
            scope.contextTitle=scope.title||title;
    var seasonyear=parseInt(params.Season.substring(0,4),10);
    var querystring=$filter("param")(params);
    if(scope.row.GAME_ID&&scope.row.EVENTNUM){
        querystring="GameID="+scope.row.GAME_ID+"&GameEventID="+scope.row.EVENTNUM
        }
        var placement=typeof iAttrs.placement!="undefined"?iAttrs.placement:"left";
    scope.videoURL="http://stats.nba.com/cvp.html?"+querystring;
    scope.shotchartURL="/shotchart/#!/?"+querystring;
    scope.trackingURL="/playlist/#!/movement?"+querystring;
    scope.movementURL="/movement/#!/?"+querystring;
    scope.hasVideo=typeof iAttrs.video!="undefined"&&iAttrs.video!==false&&!IS_MOBILE&&seasonyear>2012&&params.SeasonType!="Preseason";
    scope.hasShotchart=typeof iAttrs.shotchart!="undefined"&&iAttrs.shotchart!==false&&seasonyear>2e3&&params.SeasonType!="Preseason";
    scope.hasTracking=false;
    scope.hasMovement=false;
    if(scope.hasVideo||scope.hasShotchart||scope.hasTracking||scope.hasMovement){
        iElement.parent().addClass("stats-popup-link").on("click",function(){
            iElement.find(".svtlink").show().addClass(placement);
            $timeout(function(){
                $("body").one("click",function(){
                    iElement.find(".svtlink").hide()
                    })
                },100)
            })
        }
        scope.openOverlay=function(url,type,title){
        var modalInstance=$modal.open({
            templateUrl:"/templates/overlay/modal.html",
            controller:"ModalInstanceCtrl",
            size:"lg",
            windowClass:type,
            resolve:{
                url:function(){
                    return url
                    },
                title:function(){
                    return title
                    },
                type:function(){
                    return type
                    }
                }
        })
}
}
}
}]);
stats.directive("statsRunIt",[function(){
    "use strict";
    return{
        restrict:"E",
        replace:true,
        template:['<div class="col-sm-6 col-sm-offset-6 col-md-3 col-md-offset-9">',' <a href="" class="run-it" ng-click="runit();">Run It</a>',"</div>"].join(""),
        controller:["$scope","$location",function($scope,$location){
            $scope.runit=function(){
                var splits=$scope.splits;
                var params=$scope.params;
                for(var i in splits){
                    var val=splits[i].selected.val;
                    if(val==splits[i].default){
                        $location.search(i,null)
                        }else{
                        $location.search(i,val)
                        }
                        params[i]=val
                    }
                    $scope.$emit("runit")
                }
            }]
    }
}]);
stats.directive("statsShotchartDetail",function(){
    "use strict";
    return{
        restrict:"A",
        scope:{
            zone:"="
        },
        link:function postLink(scope,element,attrs){
            scope.$watch("zone",function(zone){
                if(!zone){
                    return
                }
                console.log(zone);
                var svgNS="http://www.w3.org/2000/svg";
                var ratio=document.createElementNS(svgNS,"text");
                ratio.setAttributeNS("","text-anchor","middle");
                ratio.setAttributeNS("","stroke","none");
                ratio.setAttributeNS("","fill","#000000");
                ratio.setAttributeNS("","font-family","Arial");
                ratio.setAttributeNS("","font-size","12px");
                ratio.setAttributeNS("","dy","0");
                ratio.textContent=zone.FGM+" / "+zone.FGA;
                var pct=document.createElementNS(svgNS,"text");
                pct.setAttributeNS("","text-anchor","middle");
                pct.setAttributeNS("","stroke","none");
                pct.setAttributeNS("","fill","#000000");
                pct.setAttributeNS("","font-family","Arial");
                pct.setAttributeNS("","font-size","12px");
                pct.setAttributeNS("","dy","14");
                pct.textContent=(zone.FG_PCT*100).toFixed(1)+"%";
                element.append(ratio).append(pct)
                })
            }
        }
});
stats.directive("statsShotchartMarker",function(){
    "use strict";
    return{
        restrict:"A",
        scope:{
            shot:"="
        },
        link:function postLink(scope,element,attrs){
            scope.$watch("shot",function(shot){
                var translate="translate("+(shot.LOC_X+250)*1.2+","+(shot.LOC_Y+50)*1.2+")";
                var madeflag=shot.SHOT_MADE_FLAG?"made":"missed";
                element.html('<circle cx="0" cy="0" r="5" class="'+madeflag+'" />');
                element.attr("transform",translate)
                })
            }
        }
});
stats.directive("statsSplitDate",["$filter",function($filter){
    "use strict";
    return{
        restrict:"EA",
        scope:{
            split:"=?"
        },
        template:['<p class="input-group stats-date-split stats-calendar">','  <input type="text" datepicker-options="dateOptions" placeholder="{{ split.label }}" name="{{ split.name }}" class="form-control" datepicker-popup="MM/dd/yyyy" ng-model="dt" is-open="opened" />','  <span class="input-group-btn">','   <button type="button" class="stats-calendar-button" ng-click="open($event)"><i class="fa fa-calendar"></i></button>',"  </span>","</p>"].join(""),
        controller:function($scope){
            $scope.opened=false;
            $scope.open=function($event){
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened=true
                };

            $scope.dateOptions={
                datepickerAppendToBody:true,
                showWeeks:false,
                showButtonBar:false
            };

            $scope.dt=$scope.split.selected.val;
            $scope.$watch("dt",function(dt){
                $scope.split.selected.val=$filter("date")($scope.dt,"MM/dd/yyyy")||""
                })
            }
        }
}]);
stats.directive("statsSplitSelect",["$filter","$modal","$timeout",function($filter,$modal,$timeout){
    "use strict";
    return{
        restrict:"EA",
        scope:{
            split:"=?"
        },
        template:['<select name="{{split.name}}" ng-model="split.selected" ng-options="v.text for v in split.options"></select>'].join(""),
        link:function postLink(scope,iElement,iAttrs){}
    }
}]);
stats.directive("statsTablePagination",[function(){
    "use strict";
    return{
        restrict:"A",
        replace:true,
        template:['<div class="table-pagination" ng-if="totalPages > 1">',
            '  <span class="ng-scope ng-binding">Page {{currentPage}} of {{totalPages}} | {{totalRows}} Rows</span>',' \n\
 <div class="page-nav left disabled" data-ng-class="{disabled: currentPage == 1}" \n\
data-ng-click="playerPaginate(\'prev\')"><i class="fa fa-caret-left"></i></div>',' \n\
 <div class="page-nav right" data-ng-class="{disabled: currentPage == totalPages}"\n\
 data-ng-click="playerPaginate(\'next\')"><i class="fa fa-caret-right"></i></div>',"</div>"].join("")
        }
    }]);
stats.directive("statsImgTeam",function(){
    "use strict";
    return{
        restrict:"E",
        scope:{
            teamAbbr:"=",
            type:"@"
        },
        link:function postLink(scope,iElement,iAttrs){
            scope.$watch("teamAbbr",function(teamAbbr){
                var teamImageUrl,fallbackUrl;
                var imgroot="/media/img/teams/";
                if(typeof teamAbbr=="undefined"||teamAbbr==null||!teamAbbr.length){
                    return
                }
                if(teamAbbr.length>0&&iAttrs.type=="pill"){
                    teamImageUrl=imgroot+"pills/"+teamAbbr+"_68x44.png";
                    fallbackUrl=imgroot+"pills/_34x22.png";
                    iElement.html('<img class="team-img" src="'+teamImageUrl+'" />')
                    }else if(teamAbbr.length>0&&!($("html").hasClass("ie8")||window.isAndroid)){
                    teamImageUrl=imgroot+"logos/"+teamAbbr+"_logo.svg";
                    fallbackUrl=imgroot+"logos/NBA-grey_logo.svg";
                    iElement.html('<img class="team-img" src="'+teamImageUrl+'" type="image/svg+xml" />')
                    }else if(teamAbbr.length>0&&($("html").hasClass("ie8")||window.isAndroid)){
                    teamImageUrl=imgroot+"logos/"+teamAbbr+"_logo.png";
                    fallbackUrl=imgroot+"logos/NBA-grey_logo.png";
                    iElement.html('<img class="team-img" src="'+teamImageUrl+'" />')
                    }
                    iElement.find("img").bind("error",function(){
                    angular.element(this).attr("src",fallbackUrl)
                    })
                })
            }
        }
});
stats.directive("statsWith",function(){
    return{
        scope:true,
        link:function(scope,el,attr){
            var expression=attr.statsWith;
            var parts=expression.split(" as ");
            if(parts.length!=2){
                return
            }
            scope.$watch(parts[0],function(value){
                scope[parts[1]]=value
                },true)
            }
        }
});
stats.filter("area",function(){
    return function(area){
        if(!area){
            return 0
            }else{
            return(area/100).toFixed(1)+" ft Â²"
            }
        }
});
stats.filter("byLetter",function(){
    return function(arr,field){
        var obj={};

        var letters=[];
        for(var i in arr){
            var val=field?arr[i][field]:arr[i];
            var li=val.charAt(0).toUpperCase();
            if(!obj[li]){
                obj[li]=[]
                }
                obj[li].push(arr[i])
            }
            for(var l in obj){
            letters.push({
                initial:l,
                items:obj[l]
                })
            }
            return letters
        }
    });
stats.filter("customStatFilter",function(){
    return function(items,filter){
        var types={
            E:function(e){
                return e[field]==val
                },
            NE:function(e){
                return e[field]!=val
                },
            G:function(e){
                return e[field]>val
                },
            GE:function(e){
                return e[field]>=val
                },
            L:function(e){
                return e[field]<val
                },
            LE:function(e){
                return e[field]<=val
                }
            };

    var s=filter.split("*");
    var field=s[0];
    var func=types[s[1]];
    var val=s[2];
    if(!field||!func||!val){
        return items
        }
        if(field.indexOf("PCT")>-1){
        val=val/100
        }
        var filtered=items.filter(func);
    return items.filter(func)
    }
});
stats.filter("debracket",function(){
    return function(string){
        return string.replace(/^\[.*\]/,"")
        }
    });
stats.filter("decimalTime",function(){
    return function(period,timestring){
        var time=0;
        var rts=Math.min(period,4);
        var ots=Math.max(period-4,0);
        if(timestring){
            var ts=timeString.split(":");
            var min=parseInt(ts[0],10);
            var sec=parseInt(ts[1],10);
            var maxReg=28800;
            if(period<=4){
                time=(period-1)*7200+(7200-(min*600+sec*10))
                }else{
                time=(ots-1)*3e3+(3e3-(min*600+sec*10));
                time+=maxReg
                }
            }else{
        time=rts*7200+ots*3e3
        }
        return time
    }
});
stats.filter("encode",function(){
    return function(uri){
        if(uri){
            return encodeURIComponent(uri)
            }
        }
});
stats.filter("first",function(){
    return function(items){
        return items[0]
        }
    });
stats.filter("format",["$filter",function($filter){
    return function(value,filterName,filterParam){
        return $filter(filterName)(value,filterParam)
        }
    }]);
stats.filter("gametime",function(){
    return function(time){
        var minutes=Math.floor(time/60);
        var seconds=time%60;
        if(minutes>0){
            return minutes+":"+("00"+seconds.toFixed(0)).slice(-2)
            }else{
            return"00:"+(seconds/100).toFixed(0)
            }
        }
});
stats.filter("lineup",function(){
    return function(lineup){
        var out=lineups.split(" - ").map(function(n){
            var name=n.split(",");
            var first=name[1]||"";
            var last=name[0];
            return first.charAt(0)+"."+last
            }).join(", ");
        return out
        }
    });
stats.filter("listColumn",function(){
    return function(arr,col,cols){
        var ipc=Math.ceil(arr.length/cols);
        var offset=(col-1)*ipc;
        var items=arr.slice(offset,ipc+offset);
        return items
        }
    });
stats.filter("notFirst",function(){
    return function(items){
        items.shift();
        return items
        }
    });
stats.filter("ordinal",[function(){
    return function(n){
        if(!n){
            return"-"
            }
            var s=["th","st","nd","rd"];
        var v=n%100;
        var ordinal=s[(v-20)%10]||s[v]||s[0];
        return n+ordinal
        }
    }]);
stats.filter("param",function(){
    return function(obj){
        var arr=[];
        for(var i in obj){
            arr.push(i+"="+obj[i])
            }
            return arr.join("&")
        }
    });
stats.filter("percent",function(){
    return function(n,useSign){
        if(n==1){
            return useSign?"100%":100
            }else if(n===null||typeof n=="undefined"){
            return"-"
            }else{
            var val=(n*100).toFixed(1);
            return useSign?val+"%":val
            }
        }
});
stats.filter("permode",[function(){
    return function(n,mode,col){
        if(n===null){
            return"-"
            }
            if(n===""){
            return""
            }
            if(!n&&n!==0){
            return n
            }
            if(col=="MIN"){
            switch(mode){
                case"PerGame":
                    return n.toFixed(1);
                case"Per100Possessions":
                    return n.toFixed(1);
                case"Per100Plays":
                    return n.toFixed(1);
                case"PerPossession":
                    return n.toFixed(3);
                case"PerPlay":
                    return n.toFixed(3);
                default:
                    return n.toFixed(0)
                    }
                }else{
        switch(mode){
            case"Totals":
                return n.toFixed(0);
            case"PerPlay":
                return n.toFixed(3);
            case"PerPossession":
                return n.toFixed(3);
            default:
                return n.toFixed(1)
                }
            }
}
}]);
stats.filter("reverse",function(){
    return function(items){
        if(items){
            return items.slice().reverse()
            }
        }
});
stats.filter("seasonid",function(){
    return function(gameid){
        var yp=parseInt(gameid.substr(3,2),10);
        var yearFrom=yp+(yp<40?2e3:1900);
        var yearTo=yearFrom+1;
        var SeasonID=yearFrom+"-"+yearTo.toString().substr(2,2);
        return SeasonID
        }
    });
stats.filter("seasontype",function(){
    return function(gameid){
        switch(gameid.substr(2,1)){
            case"1":
                return"Preseason";
            case"2":
                return"Regular Season";
            case"3":
                return"All Star";
            case"4":
                return"Playoffs";
            default:
                return"Regular Season"
                }
            }
});
stats.filter("seasonyear",function(){
    return function(year){
        var next=(+year+1).toString().slice(-2);
        var season=year+"-"+next;
        return season
        }
    });
stats.filter("wallclock",function(){
    return function(time){
        var pre;
        var qtr;
        var sec;
        var min;
        var mod;
        var ott;
        if(time>=7200){
            time-=10
            }
            if(time<=28800){
            pre="Q";
            qtr=Math.ceil(time/7200);
            mod=time%7200
            }else{
            ott=time-28800;
            pre="OT";
            qtr=Math.ceil(ott/3e3);
            mod=ott%3e3
            }
            min=Math.floor(mod/600);
        sec=(60*(mod/600-min)).toFixed(0);
        if(min==0&&sec=="0"){
            qtr+=1
            }
            return pre+qtr+" - "+("0"+min).substr(-2)+":"+("0"+sec).substr(-2)
        }
    });