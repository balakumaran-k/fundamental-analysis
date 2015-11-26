//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var schedule = require("node-schedule");

var mongo = require('mongoskin');
var rest = require('restify');

var db = mongo.db("mongodb://admin:admin@ds057934.mongolab.com:57934/nodejs");
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));


var scripts = [533022,532628,523395,590116,512161,538351,539300,530499,533292,531611,530027,539096,538812,524412,524348,524208,514274,531731,519319,512038,523204,500002,500488,505665,513119,520123,520155,532682,532057,538952,532831,538935,511756,526955,531161,500410,532774,517494,532268,530093,531525,536492,538570,517356,530901,530043,539391,533330,513149,524091,532762,511706,512599,532921,533096,539254,538563,526711,523411,538734,507852,519183,539189,538365,532727,530117,531592,590088,532056,514113,500057,532974,500303,522150,513513,521141,539056,511359,530431,523120,517041,523031,521048,534612,506947,531047,517552,523269,532840,531686,500003,531921,500463,539042,516020,537292,537492,519281,500215,532811,522273,532806,532683,524288,532975,532331,519216,511692,530713,513349,526628,530621,538778,539017,532351,524598,500710,535916,539115,531082,524075,531409,526707,532114,506235,533573,530973,517546,531156,505216,531147,531581,532166,533029,506767,532480,532749,534064,532919,532875,532633,531400,506120,521070,532878,526397,526519,530715,532309,522275,524634,506597,512008,500008,521097,538465,539196,500009,531978,539223,500425,530133,532828,513117,506248,531300,531557,521076,531681,536737,539265,526241,531991,507525,590006,538861,520077,531761,501630,515055,531127,532418,532141,500012,590062,526173,530721,519383,532910,504629,537785,531878,518091,531223,531673,532870,531519,530799,531406,523007,507828,500013,512091,534707,538833,506260,506087,532259,523694,506166,533758,517096,523537,512437,508869,500877,500014,538653,507265,532475,531364,532068,512344,520121,530565,532994,532212,524640,511038,532914,530261,504370,526851,539151,532935,531553,511605,531381,506194,526125,531017,531677,531179,538556,532397,531467,537069,513729,531560,512273,521174,516064,533068,506074,533163,517481,531297,522134,504390,539301,500101,531823,538716,530245,515030,514482,512535,532853,534564,535467,527001,519174,523716,513401,590122,514286,512247,526847,530429,507872,524594,500477,533271,526983,526187,531568,538777,530899,531392,532888,533227,500023,533221,530355,500820,524434,531847,519532,506159,530723,526433,500024,507526,502015,533138,532493,532830,506820,530187,539099,538713,526843,532759,505029,514394,511427,531795,500027,500028,532459,502352,532668,530233,524804,531336,530885,509009,522005,539177,532797,500029,505036,505010,520119,517286,500030,512277,531310,512149,532406,512573,523896,539288,512109,531541,511589,519105,513642,532215,532395,533570,505506,523850,512063,531783,508136,523186,506971,536965,532507,537766,532719,523019,526594,531268,532380,524516,532989,530197,511724,532977,533229,500031,500034,532978,512261,500032,500490,507944,511139,524824,511395,514199,530999,532382,513142,502355,500102,523319,532485,500038,520127,519295,531591,526849,509053,500039,532946,539120,532134,532149,532525,590106,532674,500041,538546,503722,532916,513502,532336,532694,524687,500042,500043,522004,506285,534109,517246,524332,524828,539447,531937,533270,539018,532645,531112,539399,522650,500048,509438,533095,532230,512195,509480,531340,524606,531582,508664,512477,533303,532430,511664,532930,500051,530803,531719,530095,504646,509449,512296,511698,501233,512608,538576,500052,531862,511501,503960,500049,500493,505688,500103,524663,500547,590021,523229,531029,533499,532454,534816,526666,514272,533108,530879,506027,500055,513333,500058,512313,524723,530841,533321,526853,531590,505681,500059,523054,514215,535620,534535,532523,524396,532330,538364,512332,500335,533006,500060,522105,511607,533408,503823,531671,526709,514183,532290,506197,526225,513422,531175,502761,531936,506981,508939,531495,526612,514440,532346,500067,531713,531420,500069,530809,524370,539122,501425,501430,500020,509470,502216,532678,523133,506315,502219,500530,539274,536820,535279,500074,505690,590081,535693,520115,531203,530207,530249,532929,526731,532113,539434,500825,532816,534731,533543,590061,533276,532123,514045,538789,532931,517421,504643,532813,533304,507515,532321,532792,517236,532386,526652,532801,524440,532834,500078,538858,511196,532483,534631,533267,539198,532938,538476,511505,524742,511720,531595,512169,509486,507486,538817,536974,513375,533260,538579,530609,532282,500870,531682,531158,539403,531900,519600,500878,530789,531119,514171,532695,532871,522251,531380,531621,532885,501150,517544,500280,500083,532548,500040,530881,532443,532413,512341,500084,532216,517271,500179,532281,500180,533230,533525,503689,526967,509631,500292,532347,539174,505520,531178,524590,505720,519552,500182,524669,534328,532129,504176,517080,531301,524735,509675,532847,514010,500183,500184,513723,511169,526899,514043,531979,538652,526307,504036,539114,503881,500440,509895,505982,532859,500189,514428,531918,532041,509635,500185,513599,509627,505725,524013,519126,505893,509650,533217,500500,500186,500449,500104,530315,500696,504713,500188,515145,537524,513039,530853,531743,590018,521068,532359,523398,526217,531661,500191,522064,517174,500193,526683,532873,500010,532761,526761,535217,531724,500187,532662,532799,509820,524019,500199,537008,532174,533244,532835,531524,534733,500116,533719,532822,531328,539437,532659,531840,507438,505726,500106,532133,511682,522289,517380,532636,531968,514238,532414,532907,511208,533177,511628,505539,517571,532614,531129,531672,517370,531594,523465,509162,517077,511473,531505,511355,530005,535667,531253,500201,530979,531343,500202,590065,532240,513361,532189,535789,532832,532960,533520,506131,514165,532814,504731,509692,524614,500850,504741,509051,504746,533047,530965,532388,500319,533329,523586,501700,532745,524648,530747,524342,538838,521016,526887,524458,531565,500207,532717,533676,531674,532100,532612,539433,504092,504058,533257,521005,532894,539175,532514,532150,526445,522165,503639,532305,524652,532001,531841,532187,501298,501295,512025,533154,532777,530703,509069,504810,500209,530777,500210,530787,531929,517433,523840,533402,512375,532706,539083,532851,500211,526871,531314,505358,535958,517423,536868,539149,500212,532303,519606,531889,530921,538835,534732,506134,532326,511391,530259,531551,539448,526512,505737,509709,517044,530781,502330,500213,532072,533181,533506,504786,523844,523752,524164,500214,523638,524494,512405,532947,531337,526859,533033,531109,524400,506161,511609,532479,508807,524622,500875,509496,523610,522183,530057,507580,530773,522245,532341,538539,506943,530049,523062,532644,532940,506522,530915,538422,530711,507155,532825,532705,531695,520139,530601,507789,532976,512237,523467,531339,514312,500219,570004,539119,532033,526865,505212,505840,532532,532627,526558,538564,532209,520051,502901,512329,500220,514318,526001,520066,526523,590132,509715,513252,501311,524330,522285,539005,531382,512233,500306,533207,506520,506910,514034,532605,500222,500223,524592,513012,538837,524731,523592,532617,538794,517063,531550,511618,530405,533103,511034,507981,532624,500227,536773,500378,532508,532286,531543,539225,536493,500380,532162,530007,538765,523405,522263,511092,523712,513691,531861,534659,538092,505750,508929,530985,506016,504080,533148,532642,500228,534600,533155,533320,530019,516078,511060,539216,590104,507987,534623,535648,519248,532926,504076,523876,514448,513250,539246,503669,590066,532673,532889,526209,511728,539393,524322,524109,531778,511357,504840,531780,500233,500234,521054,522259,530201,539014,522287,513509,533302,500235,502150,532468,514322,511131,526668,532741,506184,538896,590084,590130,521242,500236,532367,513456,506525,507779,500165,531205,512399,526115,533451,532652,538928,537784,539304,501151,531363,590003,531687,502933,530977,538295,532925,532899,524444,535136,590041,530255,539276,504084,530357,526067,531784,533192,532054,530701,532714,508993,518011,517569,519602,506528,506530,526015,530547,505890,530163,532686,507180,524174,533289,502937,532732,507948,512597,500239,531609,533790,531612,590068,507794,504269,519064,531892,506178,521127,507435,520059,520043,511200,531821,511401,519323,515037,511766,533398,532991,532442,538862,502405,506734,512024,530897,516082,532623,512279,531832,524709,534184,532362,532895,521109,532952,519136,523391,500296,521030,531212,532256,532641,519455,531416,526739,524816,537291,502407,532234,534309,523630,531289,531651,507813,500298,526616,531287,513179,530119,524654,538926,513023,519200,532504,531494,539332,508989,538668,523242,531452,500294,502168,511535,532649,508670,531049,530697,539409,519560,539016,532864,504112,523820,514332,526195,500301,505355,500790,532912,509040,511658,530811,523558,532798,511551,524558,532529,508867,501479,536644,532416,538874,513683,524774,517554,533098,590028,526721,512103,537007,590103,531083,500304,532541,526159,531272,530377,530129,523385,531598,530971,511714,532986,512425,500307,539251,539311,532789,532722,533202,508875,532854,532698,506532,512381,512245,526371,506991,539200,500730,530435,523670,532481,534615,539110,531465,513566,530733,531791,500672,530127,530367,535458,526723,532555,533015,531209,531304,524764,531819,526488,504378,539116,512489,538547,533273,535657,519491,538019,502165,533008,538894,531996,530175,500312,500313,533106,538607,526415,521105,534190,507609,531092,538537,520021,532880,519479,531496,532167,533317,532340,532882,514324,533632,535647,532944,517536,530135,532391,532466,532837,512626,524372,531157,513121,504879,530365,507690,535754,533263,502420,526325,534076,500315,506579,500314,532817,531859,590086,504864,531626,539015,539287,530173,501179,500317,539290,509099,531065,514460,523151,507260,514330,514414,539310,539291,539352,523642,513403,523483,538963,531395,532350,517230,532827,539121,532521,511597,517397,511525,531349,538860,524820,508941,504093,513511,531726,506122,531280,534796,531816,535755,524055,500322,513359,533211,531255,530555,507970,533399,521246,524689,524628,532911,538646,506128,500162,511702,511176,532780,513430,526349,521080,500456,511734,503092,539401,531120,526381,517417,524031,514326,539113,532742,535658,532676,514087,534809,539267,517119,538730,535204,532808,523260,539273,524136,531352,503031,513405,539333,513228,500329,524210,501144,521062,526435,504132,533179,524046,530381,532522,500680,533581,526747,531281,500143,512026,523620,524572,506590,526481,517296,537839,509084,526588,524808,530305,507498,532355,500331,500327,538771,519439,531879,514300,507864,533107,500302,532979,530683,513611,513519,500333,523105,523648,532739,534060,532366,539150,539347,532803,539195,523628,524570,532486,532254,526687,507645,531768,506605,531397,514486,531454,537573,526043,524051,539354,512481,532626,532460,532011,519359,531870,532933,539178,538566,532810,532898,539302,538731,532934,539351,531855,513532,533178,500192,522205,531746,533605,506022,533239,531437,531172,519014,532718,526490,531257,506107,523874,517258,523539,530669,530331,533100,526247,500540,513291,514354,509835,531802,513613,509077,533274,526109,519262,531246,530589,535514,532748,519299,530695,500337,521149,500338,531735,505530,531688,532387,524580,511557,526009,500459,523001,531265,526494,590120,532647,534675,505502,526801,590108,533344,532524,539006,509220,516092,500343,512591,512461,512099,532693,533295,506852,506618,500346,532461,509839,532891,523315,538993,538647,531562,517556,532689,536659,511116,538596,530281,590099,590110,535719,532866,536456,532735,538119,532024,509845,530917,517447,512565,524502,511153,502271,590070,532692,532497,531412,526813,531552,538921,514316,531887,530047,500339,532441,531694,523523,530291,533093,530111,530699,532826,503127,519303,532503,538707,506975,530253,507962,526662,523030,531500,526823,514028,513369,522257,539090,517522,512409,500354,532665,500355,534734,522281,500357,500358,524037,502587,539309,523289,538540,532369,532370,530951,532527,533262,515127,532690,530925,507490,531228,532661,532987,532988,505800,513727,531583,500360,501351,507966,522207,524230,531233,507649,531522,532918,524610,504903,507652,520111,534597,533122,520073,537840,507300,533294,504341,531207,500330,531825,537254,530923,534708,533608,533285,538611,530053,513558,523650,532805,532884,530815,531033,530807,515018,511585,512624,532106,533065,505817,526075,533888,533891,530517,537483,532124,500111,503162,532712,523445,500325,500390,532939,511712,532915,533172,524632,537484,502473,513043,512487,505658,504360,511149,530919,532923,535322,532687,524218,538273,505509,515085,533017,505368,531888,531952,530271,532766,539435,519230,520008,517496,524480,504365,507508,530251,514177,531539,533083,526861,523021,526492,519097,526407,512618,500365,531250,531447,531822,532731,505807,502448,500366,530991,501154,512309,531324,535503,533168,517500,526193,512047,532699,526640,532983,533284,511626,530179,500350,531215,526496,500367,503169,538742,509020,500368,513295,532785,590124,530449,533552,532955,533470,517035,532316,536710,531307,538876,535621,514197,532604,534598,532900,513515,503622,532905,539112,530267,530461,531869,532710,539346,506642,532034,531448,523025,531436,502090,532092,507663,511254,526085,511533,503691,532841,538557,531931,530905,530265,515043,590051,511066,507315,532713,526554,590056,500370,517059,532005,521240,511630,520075,530617,530125,535466,500372,500371,521206,530025,521222,532836,523116,533079,526725,524703,504918,539392,516096,514234,534618,511640,526521,533411,530073,531898,531569,532972,532435,512062,500674,531323,530035,512465,519260,531781,519238,538992,512020,504614,516032,516003,519242,532163,526885,530993,531930,514412,506190,539124,506313,532663,511076,526093,539201,539404,536592,508996,537068,503893,531160,539218,502175,511577,517320,532404,512634,524667,531893,523710,513583,532102,590098,535276,531797,511672,516110,526544,507894,534139,504908,538857,505141,531886,530361,533268,526807,521182,514264,524540,532886,530075,538875,532021,531980,521238,512529,507984,533401,531944,531794,502450,505075,511760,532993,530867,531812,524546,513436,509870,519031,501423,531431,511754,509874,512499,532455,539277,522034,514402,538666,513548,535602,512393,590109,532908,523449,538212,524552,526081,530525,533301,526839,538685,512367,526117,539111,526137,507952,531201,513709,530549,533389,523598,512289,532323,530433,524602,521003,511108,522237,513097,539148,532776,539359,532638,538795,521131,502563,500387,502180,530797,532643,533180,512463,537709,524336,516106,500388,503863,531962,512105,506180,527005,533110,539334,503837,516086,503205,532310,500356,531149,532670,503635,538975,513488,531667,590128,506874,539224,532007,530219,523236,516016,526335,520151,533219,526981,503804,512453,532083,531080,537954,539010,538897,508961,531359,532498,532945,511218,511411,538565,531506,523790,539252,517411,531219,505529,505515,520141,533014,520086,538520,530439,523728,537669,532217,500550,512131,531863,523606,524642,521194,531738,531635,512197,536073,531118,507446,507998,513472,523838,533018,533019,532877,503229,519566,523023,532029,505504,505729,509887,539410,502742,523164,532879,538667,512589,532961,532795,503811,504398,533206,500472,538562,531169,526508,533228,526479,505650,538919,523846,532419,508905,519586,513418,505192,590046,532815,505827,538635,514240,532784,512014,538923,504375,530651,532344,532293,532725,500394,502460,513699,522152,511571,507514,516038,521034,531548,533001,520057,526901,538943,532221,539378,521036,531398,526477,516108,538891,532218,509910,514454,513498,532669,590030,523826,532025,530289,538920,524727,531370,502465,534425,512413,513687,531982,512153,512291,517166,526161,521082,532172,526827,517214,555555,500285,539168,532651,512048,500402,539221,538402,530177,533121,526532,530037,507753,532842,532701,535601,523756,503806,534680,530943,538863,507918,514442,539363,521161,521234,521178,515081,513605,523222,536799,533569,533305,524636,514336,530821,539026,531723,504180,511700,530017,523351,530931,535730,513693,507946,535566,524699,522101,523218,524500,532067,500240,531274,530215,531413,530443,537750,532967,500241,533193,500245,500243,533293,505283,530145,521248,532304,530235,526409,530771,514221,517170,507598,524520,531578,519415,532942,517471,531602,512559,519485,523207,532924,514128,524280,500458,500247,537708,590107,532985,590097,507474,530299,511138,523323,505585,532400,501261,530813,524518,530139,533482,539446,539384,504392,526423,533210,523550,500249,519421,503626,532997,530149,532081,532937,539408,505299,513703,523594,511048,536170,530421,531206,531882,530967,533519,500250,526947,524202,530577,524522,531842,535387,505302,504258,500252,502958,519570,506079,534690,590075,532778,509048,532275,533012,500510,531164,532829,531134,531288,508306,517415,509046,533602,533007,526596,511593,531027,500253,507759,517463,531241,531633,523457,524748,526604,590096,507912,517518,512455,500255,530745,590082,500256,532740,526568,534422,500284,530065,523475,532998,533343,539227,514036,532783,526179,532796,532537,517206,526045,500257,531402,532368,500259,530689,505320,534532,526935,539226,538890,522241,506543,539217,536960,538772,532906,507836,523248,501471,512600,515093,531497,511638,519279,515059,511000,590134,538401,500264,524000,524270,517449,523872,512377,530347,532896,523384,519612,539041,513460,511187,513554,531515,500108,530441,505523,524232,500266,500265,526795,512337,539383,531664,531648,506041,511272,531489,530307,512301,500085,501270,522292,530309,535142,531327,511696,531977,504671,526917,530871,506894,539230,506365,537326,539011,523489,500110,526817,530495,532992,531358,511742,530427,526546,511243,519475,501833,539335,530191,534758,533407,530829,505230,531283,526373,532807,530457,532324,500087,532913,502445,531235,538786,514366,538674,532210,521210,506390,533288,523200,512213,538433,530839,500147,517330,512018,533278,501831,520131,508571,513353,539436,500830,531210,534691,535267,531216,533272,532342,531041,532456,532339,507833,522231,538965,539266,504340,526829,539091,532902,530067,531344,531067,531460,523232,538868,522295,531556,524506,532941,512199,507543,533167,506395,532179,530859,530545,523100,508814,526550,531624,523415,534920,533144,538057,538770,512093,522001,509472,524388,532392,538504,534804,539131,512379,511413,526269,526977,500092,500093,538521,538922,532363,526027,511710,500480,530843,532332,531472,532640,532271,532364,532173,532175,533151,533160,517514,523890,500096,526821,530825,501148,533309,500097,521220,532329,532528,526443,530171,531270,530393,532772,511611,502820,523369,523367,500117,590031,505703,502137,512068,531989,539190,531227,539405,532760,500645,506401,514030,512121,532848,535486,504286,504240,504256,533137,532121,537536,523782,531521,539197,531585,512445,530765,511072,511393,519588,538715,500119,531923,531198,521216,532180,512485,521151,503637,507717,538446,531043,506405,511451,507442,501945,526971,523862,531306,507886,531237,533336,523736,538902,538450,508860,500120,530801,522163,530959,500089,503978,503796,506414,531153,526927,500068,532839,532526,523810,538432,532488,526285,526315,511636,532868,533146,517973,505526,531367,526504,522261,512519,533176,526783,500124,523618,505693,511634,531471,590063,526355,517437,532610,532365,534674,505242,524818,530779,517238,532707,531533,500125,507917,520081,590080,590022,507528,531346,532751,532927,534839,530643,523732,538708,526703,532922,532696,526483,535694,505200,523127,500840,523708,530581,532820,513452,500123,503681,523329,524830,532322,524788,505700,500128,533264,526608,526705,504387,522074,531278,590087,517477,504000,522027,533218,531162,533208,504008,524588,538882,530333,532737,533161,524768,532038,532920,500132,509525,504351,512441,538684,532219,532178,533477,512369,512135,532287,526574,532700,500246,532658,523754,530407,531155,531615,530323,533261,530909,531502,500133,511716,500495,531259,514118,512439,532787,500134,500630,533149,533704,500135,534927,500136,537707,521137,532823,526468,533109,521014,531508,508906,532684,514060,514358,532876,526735,532511,500650,533090,500086,530571,526614,512163,532656,532657,505790,514474,509527,590094,531252,530079,532666,531599,530863,500139,500469,505744,526689,500141,590024,533896,500142,507910,532768,532022,526227,531486,539098,531191,526881,512219,517264,533333,508954,500144,500940,531754,511122,532996,532379,532809,524743,536751,523672,533638,530705,532518,522017,534757,503831,507552,502865,500033,532843,523696,530023,530213,500150,513579,532403,539032,530077,508980,531225,522195,521167,533213,538568,539169,531854,533400,536507,533296,570002,523574,523113,534063,504346,505250,531758,507488,513059,505714,502850,524624,531196,532155,538609,505711,539228,538881,504697,531911,526073,511128,506186,533265,532726,509550,532959,513108,500153,504397,526367,514167,531813,530945,521176,512443,500155,530615,526727,512493,530161,509563,500655,514400,509557,532622,532345,524564,532767,532183,512479,538319,535917,535431,530855,504028,532764,530389,530743,521133,532318,511652,531137,590133,506109,531739,539206,538961,530343,532285,532312,531055,500171,533048,511676,538788,532716,507815,531744,590025,507506,539013,532715,531613,533212,531199,500676,500660,532296,513528,530263,531463,531479,501848,532773,526025,531904,533104,538595,505255,532754,509567,506480,530317,532734,500163,532424,500164,533150,538787,533189,531600,532957,532630,532980,532786,538542,538180,501111,590095,505576,531928,530579,500151,526729,532439,531439,513309,523676,504701,530655,500166,500168,531913,526717,531608,531111,509148,530709,532543,533761,517564,590126,539235,504369,532482,509488,500300,526751,505710,509546,533282,532015,500620,501455,538743,590057,531737,538979,526797,508918,506076,531449,509152,511288,511543,530605,530469,532951,532139,532775,500160,500170,532744,509079,530001,524226,522217,505712,539009,523768,506457,513507,514386,526965,500173,531410,539336,507960,517300,517372,531341,500174,524754,531881,532181,500670,513536,570003,512579,506858,533248,517288,523836,518029,500690,532160,532702,524314,506879,513337,538567,532425,532457,514116,523277,532708,530141,533275,539337,502873,532145,515147,590113,532770,509597,531971,538081,512604,539125,590043,526931,530055,500467,532855,530927,524080,514296,531387,509073,533162,531531,517354,539176,508486,532467,532334,508956,532333,532720,500520,532756,533088,532313,590078,539289,500267,539229,506919,501473,539400,532728,502995,513269,533169,539045,539046,539043,532932,539044,500268,531213,533204,505850,502157,532637,514418,539275,516007,530011,500109,530243,507938,533078,539207,530537,511758,505324,538970,521018,503101,502250,513544,530543,513648,531642,526891,524404,517467,523566,531540,531319,532500,530497,523704,506867,511768,532470,511688,526671,512167,512165,539219,590083,500248,523371,534563,500271,534338,526538,532613,531221,531680,522249,523792,533152,532852,532654,532629,523221,512267,503685,531146,523144,526301,538834,512505,531176,531417,532105,532408,532865,511367,539012,511740,511377,511738,532307,523828,531727,539126,538942,526235,500126,538964,531357,512415,531810,513335,532990,500159,512253,531236,526622,513721,532850,523343,533259,526251,500277,526570,538895,531338,507621,522235,531456,538962,539303,532539,517344,532819,530955,523373,532164,505797,500279,505336,526642,539220,522036,509196,513377,532127,503772,519287,503015,509760,513303,537092,519003,500890,539007,503776,506261,531453,530169,532140,533286,533080,526263,535910,532078,513446,532723,505343,524084,538836,530167,539199,532621,511549,500288,526237,523160,532407,517140,517334,532892,534185,590115,533385,501343,507522,590011,526299,500450,526143,532440,500290,532376,512065,532650,508922,534312,531919,532097,500460,530341,513265,517374,532357,501477,534091,526169,505594,504356,506105,539255,536666,516022,531616,538733,517548,501061,500112,532200,532191,512531,500113,534748,513173,513262,513517,500399,533316,526071,536738,531509,512299,526500,508963,508998,513575,531628,530759,532374,504960,513151,532730,522085,532679,504959,532531,530611,526951,506222,532348,536671,530231,517168,511024,538714,506003,533332,506655,521113,511654,539117,513414,532887,517224,524542,530419,514211,533306,532154,532872,524715,517403,531752,532733,530795,590072,590071,533166,520056,500403,500404,531433,530953,537253,532711,521232,531945,531295,523425,506615,501110,530845,535141,512179,530735,530883,531699,512527,521180,523842,532070,523283,519234,526133,511539,532509,530677,509930,532904,500405,531934,531638,518075,531102,513597,533298,517530,530185,539253,538575,500336,533101,532874,521022,511185,521200,514138,514140,519604,501178,532782,530239,531640,537259,532667,531885,523722,503624,524488,522175,505590,506863,503816,531909,539406,503310,539353,500407,531003,590090,526365,512257,510245,501386,530585,532051,522215,517201,512359,531499,539278,517385,524470,533157,532276,539143,531115,539268,513307,531173,526506,531432,522294,533553,514142,532444,537392,519483,507785,532390,532890,505160,538987,533200,533170,531426,521038,500777,513540,523419,522229,506854,532790,532738,505685,534756,519285,538287,533203,538496,532869,512221,512271,519091,500770,532301,500483,532540,500408,500800,501301,513434,570001,500570,500400,513010,500470,532371,521228,531190,504961,532284,533393,501242,532262,524156,523301,532755,526576,533281,532804,533216,501421,523455,533266,524204,538793,539428,537119,533982,530533,506162,512157,522080,505400,533326,533164,532845,509945,526654,509015,514484,533158,531373,522073,503100,500260,530199,500411,538464,531652,507450,500412,500413,533941,590005,536264,533629,505196,503663,507205,532856,511559,500414,522113,530475,504966,532375,539008,590035,531547,533258,531814,524582,539040,532966,524717,500114,530045,511096,531035,531830,531644,500418,500420,532779,523878,526650,531771,526582,509953,530783,524484,500422,532410,532928,513063,526139,519367,509003,531254,506687,532349,532812,511730,533540,517228,500251,505854,534369,531703,531716,531675,521064,531972,517562,531658,531712,536565,590091,513428,531846,512417,534755,512101,531279,523387,505978,532356,538569,502281,533655,531659,538597,507747,517506,504973,524514,531088,505285,532948,513629,504273,531411,506808,532515,532800,532513,532343,509243,526921,512117,531917,532384,512307,526945,500464,532505,530131,500148,539141,530363,533644,538706,506685,532538,500231,504605,506690,503671,524264,530321,512595,532477,526799,500429,532646,530997,521226,526113,537582,538610,532035,531831,531867,507878,533171,507458,532478,531091,522014,532432,521188,532746,532378,539314,504212,531963,523519,504673,524408,514144,512408,531762,519273,511764,512070,530505,531390,526987,532402,532398,517146,511507,511736,532765,590101,539313,539312,500426,513216,532729,500254,526957,539123,523888,511110,507880,531266,532867,533269,532320,519152,519156,531676,532156,590111,526941,536709,511431,539402,532389,526775,530403,513397,530459,500945,512175,530369,532090,538918,530109,502589,524796,531444,500439,513534,514175,534392,502986,512511,531574,533156,538634,533576,531650,513005,522015,511493,536672,500295,533056,522267,503657,511523,539132,526755,505232,523261,524038,531015,516098,526953,512229,531950,531544,515099,520113,539331,532953,522233,538732,530487,523796,506103,503349,504991,511389,531717,523724,531069,530151,532401,537820,530961,531518,519307,530477,506196,519373,524394,504380,524200,534639,517015,531051,517393,524129,530401,514302,530627,511726,519457,530521,539167,532354,532372,534741,531126,532721,531025,506146,509055,532411,539398,538598,505930,516072,512064,511361,526441,590038,538548,524576,532660,511509,517429,509026,536128,534567,511333,534976,533427,539222,522122,509038,532757,500575,512215,539118,519331,509966,532893,532824,517399,506142,505583,501391,504220,533023,503675,501370,507410,511147,532053,524212,511690,508494,523660,517498,511074,533452,523011,504988,524661,532016,531211,539407,532144,532553,514162,533252,508933,526431,505412,532373,500444,538382,531217,505533,512297,590073,500238,513713,511246,519214,519224,526586,522029,512022,526471,507892,514470,514348,524758,538873,507685,507817,511642,532300,531396,538128,538268,526959,526525,538451,505872,532616,532788,590013,511012,514378,511601,516030,530063,532648,531260,522209,539097,530675,522108,531663,505163,506720,505537,533287,532794,533339,531845,517164,512553,514266,530665,532039,504067,531404,521163,512587,534742,500780,530091,531335,532883];

var status = [];
var total = scripts.length;
var percentage = 0;
var errors = [];

io.on('connection', function (socket) {

    socket.emit('percentage', percentage);

  });
  
  function broadcastProgress() {
    
    percentage = ((total - scripts.length) * 100) / total;
    io.sockets.emit('percentage', percentage.toPrecision(4));
  };
  
  function broadcastError(id, error) {
    
    var errorData = {'id': id, 'error': error };
    errors.push(errorData);
    io.sockets.emit('error', errorData);
    
  };
  

var client = rest.createJSONClient({
    url: 'https://www.screener.in',
    version: '*'
});


function fetchData(script) {
  
   var path = '/api/company/' + script;
   client.get(path, function(err, req, res, data) {
       if(err) {
         broadcastError(script, err);
       } else {
         
          db.collection('standalone').insertOne(data, function(err, result) {
          
              if(err) {
                broadcastError(script, err);
              } else {
                if(script.length == 0) db.close();
              }
          });
         
       }
   });
    
}
     

var j = schedule.scheduleJob('*/15 * * * * *', function() {
   
   if(script.length > 0) {
    var script = scripts.pop();
    fetchData(script);
    broadcastProgress(); 
   }
    
   
      
});

//server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
server.listen(process.env.OPENSHIFT_NODEJS_PORT|| process.env.PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
