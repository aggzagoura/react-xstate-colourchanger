export const grammar = `
<grammar root="politeness">
   <rule id="politeness">
      <one-of>
         <item>please
            <ruleref uri="#combination"/>
            <tag>out.combination=Object(); out.combination.object =rules.combination.object; out.combination.move=rules.combination.type;</tag></item>
            
         
         <item><ruleref uri="#combination"/>
         <tag>out.combination=Object(); out.combination.object =rules.combination.object; out.combination.move=rules.combination.type;</tag></item>
      </one-of>
   </rule>


   <rule id="objects_A">
         <one-of>
            <item>light</item>
            <item>heat</item>
            <item>A C<tag>out="air conditioning";</tag></item>
            <item>air conditioning</item>
         </one-of>
</rule>

   <rule id="objects_B">
          <one-of>
            <item>window</item>
            <item>door</item>
         </one-of>
   </rule>

   <rule id="action_A">
         <one-of>
            <item>off</item>
            <item>on</item>
         </one-of>
</rule>

   <rule id="action_B">
         <one-of>
            <item>open</item>
            <item>close</item>
         </one-of>
   </rule>

   <rule id="combination">
         <one-of>
            <item>turn
               <ruleref uri="#action_A"/>
               the
               <ruleref uri="#objects_A"/>
               <tag>out.object=rules.objects_A; out.type=rules.action_A;</tag></item>

            <item> <ruleref uri="#action_B"/>
               the
               <ruleref uri="#objects_B"/>
               <tag>out.object=rules.objects_B; out.type=rules.action_B;</tag></item>

            <item>turn the
               <ruleref uri="#objects_A"/>
               <ruleref uri="#action_A"/>
               <tag>out.object=rules.objects_A; out.type=rules.action_A;</tag></item>
         </one-of>
   </rule>
</grammar>
`