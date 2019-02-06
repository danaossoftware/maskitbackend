var diseases;

$(document).ready(function() {
    getDiseases();
});

function getDiseases() {
    $("#diseases").find("*").remove();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-diseases.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            diseases = JSON.parse(a);
            for (var i=0; i<diseases.length; i++) {
                var disease = diseases[i];
                var history = disease["history"];
                if (history.length > 100) {
                    history = history.substr(0, 100);
                }
                $("#diseases").append(""+
                    "<div style='width: calc(100% - 40px); margin-left: 20px; margin-right: 20px; margin-top: 10px; border-radius: 10px; border: 1px solid #3498db; display: flex; flex-flow: column nowrap;'>"+
                        "<div style='width: 100%; display: flex; justify-content: center; margin-top: 10px; font-family: \"PalanquinBold\", Arial; color: black; text-align: center;'>"+
                            disease["name"]+
                        "</div>"+
                        "<div style='position: relative; width: 100%; height: 40px;'>"+
                            "<div style='color: black; position: absolute; top: 0; left: 10px;'>Ditemukan:</div>"+
                            "<div style='color: black; position: absolute; top: 0; right: 10px;'>"+disease["found"]+"</div>"+
                        "</div>"+
                        "<div style='position: relative; width: 100%; height: 40px; margin-top: 40px;'>"+
                            "<div style='color: black; position: absolute; top: 0; left: 10px;'>Paling banyak:</div>"+
                            "<div style='color: black; position: absolute; top: 0; right: 10px;'>"+disease["most_years"]+"</div>"+
                        "</div>"+
                        "<div style='position: relative; width: 100%; height: 40px; margin-top: 80px;'>"+
                            "<div style='color: black; position: absolute; top: 0; left: 10px;'>Kasus kematian:</div>"+
                            "<div style='color: black; position: absolute; top: 0; right: 10px;'>"+disease["death_case"]+"</div>"+
                        "</div>"+
                        "<div style='position: relative; width: 100%; height: 40px; margin-top: 120px;'>"+
                            "<div style='color: black; position: absolute; top: 0; left: 10px;'>Sejarah:</div>"+
                            "<div style='color: black; position: absolute; top: 0; right: 10px;'>"+history+"</div>"+
                        "</div>"+
                    "</div>"
                );
                break;
            }
        }
    });
}

function backKey() {
    Native.finishApp();
}