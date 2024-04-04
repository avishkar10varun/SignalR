    var fm_currentDate = new Date();
    var FormCurrency_10 = 'USD';
    var FormPaypalTax_10 = '0';
    var check_submit10 = 0;
    var check_before_submit10 = {};
    var required_fields10 = ["2","11","12","9","5","8","30","14","15","26"];
    var labels_and_ids10 = {"2":"type_text","31":"type_text","11":"type_own_select","12":"type_own_select","9":"type_text","5":"type_text","8":"type_submitter_mail","30":"type_text","14":"type_own_select","15":"type_own_select","29":"type_editor","18":"type_file_upload","19":"type_file_upload","20":"type_file_upload","21":"type_file_upload","22":"type_file_upload","23":"type_file_upload","25":"type_editor","26":"type_checkbox","17":"type_recaptcha","1":"type_submit_reset"};
    var check_regExp_all10 = {"2":["%5E%28%5B1-9%5D%7C%5B1-9%5D%5B0-9%5D%5B0-9%5D%3F%7C%5B1-9%5D%5B0-9%5D%5B0-9%5D%5B0-9%5D%3F%7C%5B1-4%5D%5B0-9%5D%5B0-9%5D%5B0-9%5D%5B0-9%5D%7C50000%29%28%2C%5Cd%7B3%7D%29*%28%5C.%5Cd%7B1%2C2%7D%29%3F%24","","Only numeric input with a maximum loan amount of 50,000."],"9":["%5E%5Ba-zA-Z0-9.%5C\/%5C@%5C.%20%5Ct%5D%7B1%2C255%7D%24","","Incorrect name format"],"5":["%5E%5Cd%7B12%2C12%7D%24","","Only 12 numeric input without &#039;-&#039;."],"30":["%5E%5Cd%7B1%2C16%7D%24","","Incorrect Value"]};
    var check_paypal_price_min_max10 = [];
    var file_upload_check10 = {"18":"jpg, jpeg, png, gif, bmp, tif, tiff, svg, pdf, txt, log, doc, docx, csv, xls, xlsx, pps, ppt, pptx, xml, mp3, mp4, wma, wav, mpg, wmv","19":"jpg, jpeg, png, gif, bmp, tif, tiff, svg, pdf, txt, log, doc, docx, csv, xls, xlsx, pps, ppt, pptx, xml, mp3, mp4, wma, wav, mpg, wmv","20":"jpg, jpeg, png, gif, bmp, tif, tiff, svg, pdf, txt, log, doc, docx, csv, xls, xlsx, pps, ppt, pptx, xml, mp3, mp4, wma, wav, mpg, wmv","21":"jpg, jpeg, png, gif, bmp, tif, tiff, svg, pdf, txt, log, doc, docx, csv, xls, xlsx, pps, ppt, pptx, xml, mp3, mp4, wma, wav, mpg, wmv","22":"jpg, jpeg, png, gif, bmp, tif, tiff, svg, pdf, txt, log, doc, docx, csv, xls, xlsx, pps, ppt, pptx, xml, mp3, mp4, wma, wav, mpg, wmv","23":"jpg, jpeg, png, gif, bmp, tif, tiff, svg, pdf, txt, log, doc, docx, csv, xls, xlsx, pps, ppt, pptx, xml, mp3, mp4, wma, wav, mpg, wmv"};
    var spinner_check10 = [];
    var scrollbox_trigger_point10 = '20';
    var header_image_animation10 = 'none';
    var scrollbox_loading_delay10 = '0';
    var scrollbox_auto_hide10 = '1';
    var inputIds10 = '[]';
        var update_first_field_id10 = 0;
    var form_view_count10 = 0;
     function before_load10() {
     jQuery('.wdform_prefix').closest('.wdform_row').addClass('wd-prefix');
}

 function before_submit10() {
      }

 function before_reset10() {
     
} function after_submit10() {
     var text= '<div id="contact-form__modal"><div class="modal__content"><h1>Thank you for your submission!</h1><p>Our team will get in touch with you very soon.<br>Have a nice day! </p><button id="contact-form__close">Close</button></div></div>';
     
     jQuery('body').append(text);
     
     jQuery(document).on("click", function(event){
          if(!jQuery(event.target).closest(".modal__content").length || jQuery('#contact-form__close').is(event.target) ){
               jQuery('#contact-form__modal').css("display","none");
               
               
          }
     }
                        );
     
}    function onload_js10() {    }

    function condition_js10() {    }

    function check_js10(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js10() {
      
				  jQuery("<input type=\"hidden\" name=\"wdform_26_allow_other10\" value=\"no\" />").appendTo("#form10");
				  jQuery("<input type=\"hidden\" name=\"wdform_26_allow_other_num10\" value=\"0\" />").appendTo("#form10");
    var disabled_fields = "";
    jQuery("#form10 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields10\" value =\""+disabled_fields+"\" />").appendTo("#form10");
    };    }

    function unset_fields10( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields10(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity10( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 10,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form10 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form10 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form10 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready10() {
      if (jQuery('#form10 .wdform_section').length > 0) {
        fm_document_ready( 10 );
      }
      else {
        jQuery("#form10").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form10 .wdform_section').length > 0) {
        formOnload(10);
      }
      var ajaxObj10 = {};
      var value_ids10 = {};
      jQuery.each( jQuery.parseJSON( inputIds10 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form10 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form10 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form10 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form10 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids10[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids10[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form10 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids10[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj10.inputs = value_ids10;
          jQuery(document).on('change', '#form10 [id^="wdform_'+ input_id +'_elemen"]', function() {
          var id = '';
          var changing_field_id = '';
          if( jQuery(this).prop("tagName") == 'INPUT' ) {
            if( jQuery(this).is(':checked') ) {
              id = jQuery(this).val();
            }
            if( jQuery(this).attr('type') == 'text' ) {
              id = jQuery(this).val();
            }
          }
          else {
            id = jQuery(this).val();
          }
          value_ids10[key + '|' + input_id] = id;
          jQuery.each( value_ids10, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids10).length;
              value_ids10 = unset_fields10( value_ids10, changing_field_id, count );
            }
          });
          ajaxObj10.inputs = value_ids10;
          ajax_similarity10( ajaxObj10, changing_field_id );
          });
        });
      });
      if ( update_first_field_id10 && !jQuery.isEmptyObject(ajaxObj10.inputs) ) {
        ajax_similarity10( ajaxObj10, update_first_field_id10 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready10();
    });
    