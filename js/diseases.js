var selectedDiseaseIndex = 0;
var selectedDiseaseOption = 0;
var diseases;
var diseaseMenuShown = false;
var editDiseaseMenuShown = false;
var confirmDialogShown = false;

$(document).ready(function() {
    getDiseases();
});

function getDiseases() {
    $("#diseases").find("*").remove();
    get(SERVER_URL+'get-diseases.php', null, function(a) {
        if (a < 0) {
            // Error
        } else {
            console.log(a);
            diseases = JSON.parse(a);
            for (var i=0; i<diseases.length; i++) {
                var disease = diseases[i];
                var background = getRandomBackground();
                $("#diseases").append(""+
                    "<div class='disease' style='flex-shrink: 0; cursor: pointer; width: calc(100% - 20px); height: 40px; background: "+background+"; border-radius: 10px; display: flex; flex-flow: row nowrap; align-items: center; margin-top: 10px;'>" +
                    "<div style='margin-left: 20px; font-family: PalanquinBold; color: white; font-size: 18px;'>"+disease["name"]+"</div>"+
                    "</div>"
                );
            }
            setDiseaseClickListener();
        }
    });
}

function setDiseaseClickListener() {
    $(".disease").unbind().on("click", function() {
        var index = $(this).parent().children().index(this);
        selectedDiseaseIndex = index;
        //Native.showDiseaseOptions(index);
        $("#disease-menu").css("display", "flex");
        diseaseMenuShown = true;
    });
}

function editDisease() {
    $("#disease-menu").hide();
    diseaseMenuShown = false;
    var disease = diseases[selectedDiseaseIndex];
    $("#disease-name").val(disease["name"]);
    $("#disease-found").val(parseInt(disease["found"]));
    $("#disease-years").val(parseInt(disease["most_years"]));
    $("#disease-death").val(parseInt(disease["death_case"]));
    $("#disease-history").val(disease["history"]);
    $("#edit-disease").css("display", "flex");
    editDiseaseMenuShown = true;
    $("#edit-disease-title").html("Ubah Penyakit");
    $("#edit-disease-ok").unbind().on("click", function() {
        var name = $("#disease-name").val();
        var found = $("#disease-found").val();
        var mostYears = $("#disease-years").val();
        var deathCases = $("#disease-death").val();
        var history = $("#disease-history").val();
        if (name == "" || found == "" || mostYears == "" || deathCases == "" || history == "") {
            showToast("Mohon masukkan semua data");
            return;
        }
        $("#edit-disease").hide();
        editDiseaseMenuShown = false;
        $("#loading-text").html("Menambahkan ke daftar penyakit...");
        $("#loading-container").css("display", "flex");
        var fd = new FormData();
        fd.append("id", disease["id"]);
        fd.append("name", name);
        fd.append("found", parseInt(found.trim()));
        fd.append("most_years", parseInt(mostYears.trim()));
        fd.append("death_case", parseInt(deathCases.trim()));
        fd.append("history", history);
        post(SERVER_URL+'edit-disease.php', fd, function(a) {
            $("#loading-container").hide();
            getDiseases();
        });
    });
    $("#edit-disease-cancel").unbind().on("click", function() {
        $("#edit-disease").hide();
        editDiseaseMenuShown = false;
    });
}

function deleteDisease() {
    $("#confirm-title").html("Hapus Penyakit");
    $("#confirm-desc").html("Apakah Anda yakin ingin menghapus penyakit ini?");
    $("#confirm-container").css("display", "flex");
    confirmDialogShown = true;
    $("#confirm-ok").unbind().on("click", function() {
        var disease = diseases[selectedDiseaseIndex];
        $("#disease-menu").hide();
        diseaseMenuShown = false;
        $("#confirm-container").hide();
        confirmDialogShown = false;
        $("#loading-text").html("Menghapus penyakit...")
        $("#loading-container").css("display", "flex");
        get(SERVER_URL+'delete-disease.php', {'disease-id': disease["id"]}, function(a) {
            $("#loading-container").hide();
            getDiseases();
        });
    });
    $("#confirm-cancel").unbind().on("click", function() {
        $("#disease-menu").hide();
        diseaseMenuShown = false;
        $("#confirm-container").hide();
        confirmDialogShown = false;
    });
}

function addDisease() {
    //Native.addNewDisease();
    $("#disease-name").val("");
    $("#disease-found").val("");
    $("#disease-years").val("");
    $("#disease-death").val("");
    $("#disease-history").val("");
    $("#edit-disease").css("display", "flex");
    editDiseaseMenuShown = true;
    $("#edit-disease-title").html("Tambah Penyakit");
    $("#edit-disease-ok").unbind().on("click", function() {
        var name = $("#disease-name").val();
        var found = $("#disease-found").val();
        var mostYears = $("#disease-years").val();
        var deathCases = $("#disease-death").val();
        var history = $("#disease-history").val();
        if (name == "" || found == "" || mostYears == "" || deathCases == "" || history == "") {
            showToast("Mohon masukkan semua data");
            return;
        }
        $("#edit-disease").hide();
        editDiseaseMenuShown = false;
        $("#loading-text").html("Menambahkan ke daftar penyakit...");
        $("#loading-container").css("display", "flex");
        var fd = new FormData();
        fd.append("name", name);
        fd.append("found", parseInt(found.trim()));
        fd.append("most_years", parseInt(mostYears.trim()));
        fd.append("death_case", parseInt(deathCases.trim()));
        fd.append("history", history);
        post(SERVER_URL+'add-disease.php', fd, function(a) {
            console.log(a);
            $("#loading-container").hide();
            getDiseases();
        });
    });
    $("#edit-disease-cancel").unbind().on("click", function() {
        $("#edit-disease").hide();
        editDiseaseMenuShown = false;
    });
}

function diseaseAdded(diseaseName, found, mostYears, deathCase, history) {
    Native.showLoadingDialog("Menambah penyakit...");
    var fd = new FormData();
    fd.append("name", diseaseName);
    fd.append("found", found);
    fd.append("most_years", mostYears);
    fd.append("death_case", deathCase);
    fd.append("history", history);
    post(SERVER_URL+'add-disease.php', fd, function(a) {
        var background = getRandomBackground();
        $("#diseases").append(""+
            "<div class='disease' style='cursor: pointer; width: calc(100% - 20px); height: 40px; background: "+background+"; border-radius: 10px; display: flex; flex-flow: row nowrap; align-items: center; margin-top: 10px;'>" +
            "<div style='margin-left: 20px; font-family: PalanquinBold; color: white; font-size: 18px;'>"+diseaseName+"</div>"+
            "</div>"
        );
        setDiseaseClickListener();
        //Native.hideLoadingDialog();
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
        get(SERVER_URL+'delete-disease.php', {'disease-id': disease["id"]}, function(a) {
            Native.hideLoadingDialog();
            getDiseases();
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
    post(SERVER_URL+'edit-disease.php', fd, function(a) {
        Native.hideLoadingBar();
        getDiseases();
    });
}

function closeDiseaseMenuDialog() {
    $("#disease-menu").hide();
    diseaseMenuShown = false;
}

function backKey() {
    if (menuShown) {
        closeMenu();
    } else if (diseaseMenuShown) {
        closeDiseaseMenuDialog();
    } else if (editDiseaseMenuShown) {
        $("#edit-disease").hide();
        editDiseaseMenuShown = false;
    } else if (confirmDialogShown) {
        $("#confirm-container").hide();
        confirmDialogShown = false;
    } else {
        Native.finishApp();
    }
}