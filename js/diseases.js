var selectedDiseaseIndex = 0;
var selectedDiseaseOption = 0;
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
            if (a < 0) {
                // Error
            } else {
                console.log(a);
                diseases = JSON.parse(a);
                for (var i=0; i<diseases.length; i++) {
                    var disease = diseases[i];
                    var background = getRandomBackground();
                    $("#diseases").append(""+
                        "<div class='disease' style='cursor: pointer; width: calc(100% - 20px); height: 40px; background: "+background+"; border-radius: 10px; display: flex; flex-flow: row nowrap; align-items: center; margin-top: 10px;'>" +
                        "<div style='margin-left: 20px; font-family: PalanquinBold; color: white; font-size: 18px;'>"+disease["name"]+"</div>"+
                        "</div>"
                    );
                }
                setDiseaseClickListener();
            }
        }
    });
}

function setDiseaseClickListener() {
    $(".disease").unbind().on("click", function() {
        var index = $(this).parent().children().index(this);
        selectedDiseaseIndex = index;
        Native.showDiseaseOptions(index);
    });
}

function addDisease() {
    Native.addNewDisease();
}

function diseaseAdded(diseaseName, found, mostYears, deathCase, history) {
    Native.showLoadingDialog("Menambah penyakit...");
    var fd = new FormData();
    fd.append("name", diseaseName);
    fd.append("found", found);
    fd.append("most_years", mostYears);
    fd.append("death_case", deathCase);
    fd.append("history", history);
    $.ajax({
        type: 'POST',
        url: SERVER_URL+'add-disease.php',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            var background = getRandomBackground();
            $("#diseases").append(""+
                "<div class='disease' style='cursor: pointer; width: calc(100% - 20px); height: 40px; background: "+background+"; border-radius: 10px; display: flex; flex-flow: row nowrap; align-items: center; margin-top: 10px;'>" +
                "<div style='margin-left: 20px; font-family: PalanquinBold; color: white; font-size: 18px;'>"+diseaseName+"</div>"+
                "</div>"
            );
            Native.hideLoadingDialog();
        }
    });
}

function getRandomBackground() {
    var minimum = 0;
    var maximum = 5;
    var bgIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var background = "linear-gradient(to right, #13c2e9, #f645fa)";
    if (bgIndex == 1) {
        background = "linear-gradient(to right, #f12711, #f5ae19)";
    } else if (bgIndex == 2) {
        background = "linear-gradient(to right, #825fc1, #2ebe91)";
    } else if (bgIndex == 3) {
        background = "linear-gradient(to right, #01958b, #38ef7d)";
    } else if (bgIndex == 4) {
        background = "linear-gradient(to right, #01958b, #38ef7d)";
    } else if (bgIndex == 5) {
        background = "linear-gradient(to right, #1a2080, #26cfce)";
    }
    return background;
}

function diseaseOptionSelected(index, option) {
    var index = selectedDiseaseIndex;
    var disease = diseases[index];
    selectedDiseaseOption = option;
    if (option == 0) {// Rename
        Native.editDisease(disease["id"], disease["name"], disease["found"], disease["most_years"], disease["death_case"], disease["history"]);
    } else if (option == 1) {// Delete
        Native.showPromptDialog("Apakah Anda yakin ingin menghapus penyakit ini?");
    }
}

function promptOK() {
    if (selectedDiseaseOption == 0) {
        var index = selectedDiseaseIndex;
        var disease = diseases[index];
        Native.showLoadingDialog("Menghapus penyakit...");
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'delete-disease.php',
            data: {'disease-id': disease["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
                Native.hideLoadingDialog();
                getDiseases();
            }
        });
    }
}

function promptCancel() {

}

function diseaseEditted(id, name, found, mostYears, deathCase, history) {
    Native.showLoadingBar("Mengubah nama penyakit...");
    var fd = new FormData();
    fd.append("id", id);
    fd.append("name", name);
    fd.append("found", found);
    fd.append("most_years", mostYears);
    fd.append("death_case", deathCase);
    fd.append("history", history);
    $.ajax({
        type: 'POST',
        url: SERVER_URL+'edit-disease.php',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            Native.hideLoadingBar();
            getDiseases();
        }
    });
}