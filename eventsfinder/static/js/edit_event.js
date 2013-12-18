var edit_event = {
    init : function() {
        var event_info = $("#edit-event-info");

        $('.input-name').focus(function() {
            $(this).css("border", "");
        });

        $('.add-staff-btn').click(function() {
            var that = $(this);
            var staff_type = that.attr("data-staff_type");
            var username = that.parent().find(".input-username").attr("value");
            var name = that.parent().find(".input-name").attr("value");
            var url = that.parent().find(".input-url").attr("value");

            if(!name) {
                that.parent().find(".input-name").css("border","solid red");
                return false;
            }

            console.log(event_info.attr("data-add_staff_url"));

            $.ajax({
                url: event_info.attr("data-add_staff_url"),
                dataType: "json",
                type: "POST",
                data: {
                    event_id: event_info.attr('data-event_id'),
                    staff_type: staff_type,
                    username: username,
                    name: name,
                    url: url
                },
                success : function(res) {
                    if (!res.error) {
                        var staff_html = '<div data-staff_id="'+res.staff_id+'" class="col-md-3 well staff-container"><h4>'+name+'</h4>' + (url ? '<a href="'+url+'">url</a>':'')+(username ? '<br><a href="/accounts/'+username+'/">Profile</a>' : '') + '<a class="remove-staff-btn" href="#">x</a></div>';
                        that.closest(".row").append(staff_html);
                    }
                }
            });
        });

        $(document).on('click', '.remove-staff-btn', function(event) {
            event.preventDefault();

            var that = $(this);
            var staff_id = that.closest(".staff-container").attr("data-staff_id");

            $.ajax({
                url: event_info.attr("data-remove_staff_url"),
                dataType: "json",
                type: 'POST',
                data: {
                    staff_id: staff_id
                },
                success: function(res) {
                    console.log(res);
                    if (!res.error) {
                        console.log("success:");
                        console.log(res);
                        that.closest(".staff-container").remove();
                    }
                }
            });
        });

        $('#add-event-tag-bar').tagit({ select:true, sortable: true });

        $('#add-event-form').submit(function(event) {
            var tags = getTags($('#add-event-tag-bar').tagit('tags'));
            $("#add-event-tags").attr("value", tags);
        });

        function getTags(tags) {
            var string = tags[0].value;
            for (var i in tags) {
                if (i == 0) continue;
                string += "," + tags[i].value;
            }
            return string.toLowerCase()
        }
    }
};

$(function() {
    edit_event.init()
});