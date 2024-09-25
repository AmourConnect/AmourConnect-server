using Domain.Dtos.AppLayerDtos;

namespace Application.Services
{
    public class ExceptionAPI(string message, bool success, string result) : Exception(message)
    {
        private readonly string _message = message;
        private readonly bool _success = success;

        //public ApiResponseDto ManageApiMessage()
        //{
        //    if(_success == true)
        //    {
        //        var apiResponse = new ApiResponseDto() 
        //        {
        //            message = _message,
        //            succes = _success,
        //        };

        //        return apiResponse;
        //    }
        //}
    }
}