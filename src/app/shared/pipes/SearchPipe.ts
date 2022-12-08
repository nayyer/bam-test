import {PipeTransform, Pipe} from "@angular/core";
import { ToDo } from '@core/interfaces/ToDo';

@Pipe(
  {
    name: 'search'
  }
)
export class SearchPipe implements PipeTransform
{

  constructor()
  {

  }

  transform(value: ToDo[], args: string): any
  {
    let result:any[]=value;
    if (args )
    {
      result = value.filter(item => item.task.includes(args));

    }
    return result;
  }

}
